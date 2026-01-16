
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askMissionExpert = async (prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the SEDS X OSC 'Neural Link' Mainframe. You help hackers with CTF challenges, programming, and hackathon logistics. Speak in a concise, technical, and slightly cyber-punk/terminal style. Use Google Search to find real-time info on cyber-security trends or hackathon news. If you don't know something, say 'ENCRYPTION STRENGTH TOO HIGH. ACCESS DENIED.'",
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "NO RESPONSE FROM MAINFRAME.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Data Node",
      uri: chunk.web?.uri || "#"
    })) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "CRITICAL SYSTEM ERROR: UPLINK FAILED.",
      sources: [] 
    };
  }
};
