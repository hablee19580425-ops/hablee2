import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: API Key is assumed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGameMetadata = async (
  base64Image: string,
  mimeType: string
): Promise<{ titleKorean: string; titleEnglish: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Analyze this game cover image.
            1. Identify the game title in Korean (titleKorean). If it's not written in Korean, translate or transliterate it.
            2. Identify the game title in English (titleEnglish).
            
            Return ONLY JSON.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titleKorean: { type: Type.STRING },
            titleEnglish: { type: Type.STRING },
          },
          required: ["titleKorean", "titleEnglish"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback if AI fails or key is missing
    return {
      titleKorean: "새 게임",
      titleEnglish: "New Game",
    };
  }
};