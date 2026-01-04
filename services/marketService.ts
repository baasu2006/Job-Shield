
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface InternshipListing {
  title: string;
  company: string;
  link: string;
  source: string;
  postedDate: string;
}

export interface SkillTrend {
  skill: string;
  relevance: number; // 1-100
  description: string;
}

export const fetchLiveInternships = async (query: string): Promise<InternshipListing[]> => {
  const prompt = `Find 5-7 active, legitimate internship postings for "${query}" from the last 30 days. 
  Focus on reputable job boards or official company career pages. 
  Return a JSON array of objects with title, company, link, source, and approximate postedDate.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ text: prompt }],
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              company: { type: Type.STRING },
              link: { type: Type.STRING },
              source: { type: Type.STRING },
              postedDate: { type: Type.STRING }
            },
            required: ["title", "company", "link", "source"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Failed to fetch internships:", error);
    return [];
  }
};

export const fetchSkillTrends = async (domain: string): Promise<SkillTrend[]> => {
  const prompt = `Analyze recent job descriptions (last 6 months) for "${domain}" roles. 
  What are the top 5 most sought-after skills or technologies that companies are currently focusing on? 
  Return a JSON array of objects with skill name, relevance (1-100), and a brief description of why it's trending.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ text: prompt }],
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              relevance: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ["skill", "relevance", "description"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
};
