import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
You are an expert, friendly, and helpful onboarding assistant for international exchange students at HS Pforzheim (Hochschule Pforzheim).
Your audience is young students, often in a new country for the first time.
Your tone should be welcoming, clear, and encouraging.

KEY SOURCES:
For events and social life, prioritize information from:
- Instagram: @pfnext, @pforzheim_city, @asta_pf, @campus_x, @commeo_pf
For university regulations and news:
- Website: hs-pforzheim.de
- Instagram: @hspforzheim, @hspf_international

You must answer questions related to student life, including but not limited to: visa, housing, transport, SIM cards, health insurance, university registration, city services, and making friends.
When asked about restaurants, bars, or events, use the 'googleSearch' tool to find current, real-world information in Pforzheim.
Keep answers concise and easy to understand. Use simple language.
`;

export const getChatbotResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        // Enable Google Search grounding
        tools: [{ googleSearch: {} }],
      },
    });
    
    // Check for grounding chunks to append sources if needed (optional, but good practice)
    const text = response.text || "I couldn't find an answer to that.";
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
};

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Nightlife' | 'Culture' | 'University' | 'Other';
  description: string;
  sourceUrl: string;
}

export const getRecommendedEvents = async (): Promise<EventItem[]> => {
  try {
    const prompt = `
      Search for upcoming student events, parties, city festivals, and university academic dates in Pforzheim for the next 4 weeks.
      Focus on these sources: @pfnext, @asta_pf, @campus_x, @commeo_pf, and the hs-pforzheim.de website.
      
      Return a list of 6 distinct events.
      
      CRITICAL: You must return ONLY a valid JSON array. Do not wrap it in markdown code blocks (like \`\`\`json). Just the raw JSON string.
      The JSON objects must have these exact keys: "id" (string), "title" (string), "date" (string, e.g., "Oct 12, 2023"), "location" (string), "category" (one of "Nightlife", "Culture", "University", "Other"), "description" (short string), "sourceUrl" (string, use a real URL if found, else the main website URL).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseSchema is NOT allowed with tools, so we rely on the prompt for JSON format.
        temperature: 0.5, 
      },
    });

    let text = response.text || "[]";
    // Clean up markdown if the model ignores the instruction
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const events = JSON.parse(text) as EventItem[];
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    // Return mock data fallback if API fails or search is empty
    return [
      {
        id: '1',
        title: 'Semester Opening Party',
        date: 'Upcoming Friday',
        location: 'Turm Pforzheim',
        category: 'Nightlife',
        description: 'The biggest student party of the semester hosted by AStA.',
        sourceUrl: 'https://www.instagram.com/asta_pf/'
      },
      {
        id: '2',
        title: 'International Orientation Week',
        date: 'Next Monday',
        location: 'HS Pforzheim, Audimax',
        category: 'University',
        description: 'Welcome session for all new international students.',
        sourceUrl: 'https://www.hs-pforzheim.de/'
      },
      {
        id: '3',
        title: 'City Food Festival',
        date: 'This Weekend',
        location: 'Marktplatz',
        category: 'Culture',
        description: 'Local food trucks and music in the city center.',
        sourceUrl: 'https://www.instagram.com/pforzheim_city/'
      }
    ];
  }
};
