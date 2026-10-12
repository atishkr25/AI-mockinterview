import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIInstance = null;

const getGenAI = () => {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
};

const cleanJsonString = (text) => {
  if (!text || typeof text !== "string") return "";
  let cleaned = text.trim();
  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  cleaned = cleaned.replace(/\s*```$/i, "");
  return cleaned.trim();
};

export const generateJson = async (prompt, systemInstruction = "") => {
  const genAI = getGenAI();
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  const executeCall = async () => {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction || undefined,
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    const cleaned = cleanJsonString(rawText);

    return JSON.parse(cleaned);
  };

  try {
    return await executeCall();
  } catch (firstError) {
    void firstError;
    try {
      // Retry once as requested in Stage 3
      return await executeCall();
    } catch (retryError) {
      throw new Error(`Gemini JSON parse/generation error: ${retryError.message}`);
    }
  }
};

export default {
  generateJson,
};
