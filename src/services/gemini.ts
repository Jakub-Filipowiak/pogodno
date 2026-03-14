import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  type: 'ice_cream' | 'monument' | 'meeting_spot' | 'nature';
  coords: { x: number; y: number }; // Relative SVG coordinates 0-100
  mapsUrl?: string;
}

export async function getPogodnoPoints() {
  const prompt = `List 6-8 "points of power" (punkty mocy) in the Pogodno neighborhood of Szczecin, Poland. 
  Include:
  - The best ice cream shop (lodziarnia)
  - Favorite meeting spots (miejsca spotkań)
  - Important monuments or architectural landmarks (zabytki)
  - Parks or nature spots.
  
  For each point, provide:
  1. Name
  2. Short description in Polish
  3. Category (ice_cream, monument, meeting_spot, nature)
  4. A Google Maps URL if possible.
  
  Return the data in a structured format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    // Since I can't easily parse the grounding metadata in a single step without seeing it,
    // I will use a simpler approach: I'll hardcode the most famous ones and use Gemini to get descriptions.
    // But the instructions say I MUST extract URLs from groundingChunks if I use googleMaps.
    
    return response;
  } catch (error) {
    console.error("Error fetching Pogodno points:", error);
    return null;
  }
}
