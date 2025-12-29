import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure API keys are handled securely (backend proxy).
// Here we rely on the environment variable as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string, brand: string, nuances: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Actúa como un sommelier experto en aceites de oliva.
      Escribe una descripción de producto seductora, corta y comercial (máximo 60 palabras) para un aceite de oliva.
      Producto: ${productName}
      Marca: ${brand}
      Notas de cata/Características: ${nuances}
      
      El tono debe ser sofisticado, natural y evocador. Enfócate en la experiencia sensorial.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Descripción no disponible en este momento.";
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "Error al generar descripción. Por favor intente manualmente.";
  }
};

export const generateBlogTopicIdea = async (): Promise<{title: string, excerpt: string}> => {
    try {
        const model = 'gemini-3-flash-preview';
        const prompt = `Genera una idea para un artículo de blog sobre aceite de oliva, salud mediterránea o cocina gourmet.
        Devuelve un objeto JSON con 'title' y 'excerpt'.
        `;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        return JSON.parse(response.text || '{}');
    } catch (error) {
        console.error("Error generating blog idea:", error);
        return { title: "Beneficios del Aceite de Oliva", excerpt: "Descubre por qué es oro líquido." };
    }
}
