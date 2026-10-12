export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Interview {
  _id: string;
  role: string;
  description: string;
  experience: number | string;
  techStack: string[];
  questions: Question[];
  overallScore: number | null;
  summary: { strengths: string[]; improvements: string[] };
  createdAt: string;
}

export interface Question {
  _id?: string;
  question: string;
  answer: string;
  rating: number | null;
  feedback: string;
  strengths?: string;
  idealAnswer?: string;
}
