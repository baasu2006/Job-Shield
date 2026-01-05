
export enum RiskLevel {
  LOW = 'LOW RISK',
  MEDIUM = 'MEDIUM RISK',
  HIGH = 'HIGH RISK'
}

export enum ContactMethod {
  EMAIL = 'Email',
  WHATSAPP = 'WhatsApp',
  TELEGRAM = 'Telegram',
  OTHER = 'Other'
}

export interface JobData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  recruiterEmail: string;
  salary: string;
  askedForMoney: boolean;
  contactMethod: ContactMethod;
  offerImage?: string; // Base64 encoded image
}

export interface VerificationLink {
  uri: string;
  title: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  redFlags: string[];
  trustIndicators: string[]; // Reasons why it might be safe
  aiRecommendation: string;
  detailedAnalysis: string;
  verificationLinks: VerificationLink[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  jobData: JobData;
  result: AnalysisResult;
}
