
import { JobData, AnalysisResult, RiskLevel, ContactMethod } from "../types";
import { analyzeJobWithAI } from "./geminiService";

export const performRiskAnalysis = async (jobData: JobData): Promise<AnalysisResult> => {
  let baseScore = 0;
  const hardRedFlags: string[] = [];
  const hardTrustIndicators: string[] = [];

  if (jobData.askedForMoney) {
    baseScore += 50;
    hardRedFlags.push("Asking for payment for equipment or training is a major scam indicator.");
  } else {
    hardTrustIndicators.push("No immediate request for money detected.");
  }

  if (jobData.recruiterEmail && jobData.recruiterEmail.trim() !== '') {
    const freeEmailProviders = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    const emailParts = jobData.recruiterEmail.split('@');
    const emailDomain = emailParts.length > 1 ? emailParts[1].toLowerCase() : null;
    
    if (jobData.companyName && emailDomain && freeEmailProviders.includes(emailDomain)) {
      baseScore += 20;
      hardRedFlags.push(`Uses a public email (@${emailDomain}) instead of a corporate domain.`);
    } else if (emailDomain && !freeEmailProviders.includes(emailDomain)) {
      hardTrustIndicators.push(`Uses a custom domain (@${emailDomain}) which is common for real businesses.`);
    }
  }

  const aiResult = await analyzeJobWithAI(jobData);
  
  let finalScore = Math.max(baseScore, aiResult.riskScore);
  if (baseScore > 20 && aiResult.riskScore > 20) {
    finalScore = Math.min(100, (baseScore + aiResult.riskScore) / 1.2);
  }

  let level = RiskLevel.LOW;
  if (finalScore >= 70) level = RiskLevel.HIGH;
  else if (finalScore >= 35) level = RiskLevel.MEDIUM;

  return {
    riskLevel: level,
    riskScore: Math.round(finalScore),
    redFlags: [...new Set([...hardRedFlags, ...aiResult.redFlags])],
    trustIndicators: [...new Set([...hardTrustIndicators, ...aiResult.trustIndicators])],
    aiRecommendation: aiResult.recommendation,
    detailedAnalysis: aiResult.reasoning,
    verificationLinks: aiResult.verificationLinks
  };
};
