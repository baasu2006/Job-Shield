
import { GoogleGenAI, Type } from "@google/genai";
import { JobData, VerificationLink } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeJobWithAI = async (jobData: JobData) => {
  const modelName = 'gemini-3-flash-preview';
  
  const prompt = `
    Analyze this job posting for potential scam indicators and signs of legitimacy.
    CRITICAL: Use Google Search to verify if this company (${jobData.companyName}) is real, 
    if they actually have a careers portal, and if there are any reported scams related to this job title or email (${jobData.recruiterEmail || 'Not provided'}).
    
    Job Details:
    - Job Title: ${jobData.jobTitle}
    - Company: ${jobData.companyName}
    - Recruiter Email: ${jobData.recruiterEmail || 'Not provided'}
    - Contact Method: ${jobData.contactMethod}
    
    Job Description Text:
    ${jobData.jobDescription}
    
    Your task:
    1. Cross-reference with web data to see if this job exists on official platforms.
    2. Check for linguistic red flags (request for money, unprofessional grammar).
    3. Identify trust indicators (official company domain, professional process).
    
    Return a structured JSON analysis.
  `;

  try {
    const parts: any[] = [{ text: prompt }];
    
    if (jobData.offerImage) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: jobData.offerImage.split(',')[1]
        }
      });
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { 
              type: Type.NUMBER, 
              description: "A score from 0-100 indicating likelihood of a scam." 
            },
            redFlags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of suspicious elements found via text or web search."
            },
            trustIndicators: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of legitimate elements verified via web search or text."
            },
            recommendation: { 
              type: Type.STRING, 
              description: "Short, actionable advice." 
            },
            reasoning: { 
              type: Type.STRING, 
              description: "Full explanation of the web verification and text analysis." 
            }
          },
          required: ["riskScore", "redFlags", "trustIndicators", "recommendation", "reasoning"]
        }
      }
    });

    // Extract grounding links if available
    const verificationLinks: VerificationLink[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          verificationLinks.push({
            uri: chunk.web.uri,
            title: chunk.web.title
          });
        }
      });
    }

    const resultData = JSON.parse(response.text || '{}');
    return { ...resultData, verificationLinks };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return {
      riskScore: jobData.askedForMoney ? 95 : 40,
      redFlags: ["Analysis engine encountered an error."],
      trustIndicators: [],
      recommendation: "Proceed with caution.",
      reasoning: "The AI analysis could not be completed. Please manually verify details.",
      verificationLinks: []
    };
  }
};
