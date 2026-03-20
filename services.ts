
import { GoogleGenAI } from "@google/genai";

// Vite exposes env vars at build time via import.meta.env (prefix with VITE_).
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const analyzeCloudData = async (data: any) => {
  if (!ai) throw new Error("AI Service not initialized");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this cloud resource data for security compliance and anomalies: ${JSON.stringify(data)}`,
    config: {
      systemInstruction: "You are a world-class cloud security auditor. Provide a detailed report including risk levels, specific vulnerabilities, and remediation steps."
    }
  });
  
  return response.text;
};

export const analyzeCloudImage = async (base64Image: string, prompt: string) => {
  if (!ai) throw new Error("AI Service not initialized");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { mimeType: "image/png", data: base64Image } },
        { text: prompt }
      ]
    },
    config: {
      systemInstruction: "You are a multi-modal security analyst. Analyze the provided image (likely a cloud console screenshot or network diagram) for security risks."
    }
  });
  
  return response.text;
};
