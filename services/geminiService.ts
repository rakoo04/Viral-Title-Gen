import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, constructUserPrompt } from "../constants";
import { FormData } from "../types";

// Helper to get the API key safely
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error("API Key not found in environment variables.");
  }
  return key;
};

export const generateTitles = async (data: FormData): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const userPrompt = constructUserPrompt(
      data.topic,
      data.audience,
      data.valueProp,
      data.niche,
      data.currentTitle
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative but grounded in the framework
        maxOutputTokens: 2000,
      },
    });

    if (!response.text) {
      throw new Error("No text generated from the model.");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate titles: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while contacting the AI.");
  }
};
