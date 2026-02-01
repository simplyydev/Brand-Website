
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Performs a conversion optimization audit for a website description using Gemini.
 * Uses gemini-3-flash-preview for fast and efficient text analysis.
 */
export async function getConversionAudit(description: string) {
  // Always initialize GoogleGenAI with a named parameter and use process.env.API_KEY directly.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a conversion optimization audit for a website described as follows: "${description}". Provide a conversion score (0-100), 3 specific actionable recommendations, and a general summary of design tips to improve buyer psychology.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            tips: { type: Type.STRING }
          },
          required: ["score", "recommendations", "tips"]
        }
      }
    });

    // Access the .text property directly (do not call it as a method).
    const text = response.text;
    if (!text) {
      return null;
    }

    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    // Standard error handling: assume API key and connection issues are handled or logged.
    return null;
  }
}
