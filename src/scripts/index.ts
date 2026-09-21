import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const chatSession = model.startChat({ generationConfig, safetySettings });

const parseJson = <T,>(text: string): T => {
  const withoutFence = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const start = Math.min(
    ...[withoutFence.indexOf("["), withoutFence.indexOf("{")].filter(
      (index) => index >= 0
    )
  );
  const end = Math.max(withoutFence.lastIndexOf("]"), withoutFence.lastIndexOf("}"));
  if (start < 0 || end < start) {
    throw new Error("Gemini returned no JSON payload");
  }
  return JSON.parse(withoutFence.slice(start, end + 1)) as T;
};

export const generateJson = async <T,>(prompt: string): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig,
        safetySettings,
      });
      return parseJson<T>(result.response.text());
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      const retryable = /429|500|502|503|504|overloaded|timeout|JSON|Gemini returned/i.test(message);
      if (!retryable || attempt === 2) break;
      if (/429|500|502|503|504|overloaded|timeout/i.test(message)) {
        await wait((attempt + 1) * 1000);
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Gemini request failed");
};

export interface InterviewAnalysisItem {
  questionId: string;
  score: number;
  wentWell: string;
  improve: string;
  idealAnswer: string;
}

export interface InterviewAnalysis {
  overallScore: number;
  summary: string;
  answers: InterviewAnalysisItem[];
}
