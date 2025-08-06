import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getArticleAnalysis = async (articleContent: string) => {
  const systemPrompt = `
    Jesteś ekspertem w dziedzinie logistyki i transportu lądowego w Polsce. Twoim zadaniem jest analiza artykułu i przedstawienie go w skondensowanej formie w formacie JSON dla menedżera logistyki.
    Odpowiedź MUSI być poprawnym obiektem JSON z następującymi polami:
    {
      "summary_points": ["Pierwszy kluczowy wniosek.", "Drugi kluczowy wniosek.", "Trzeci kluczowy wniosek."],
      "why_it_matters": "Jedno zdanie wyjaśniające, dlaczego ta informacja jest ważna dla menedżera lub spedytora w Polsce.",
      "tags": ["tag1", "tag2"]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Przeanalizuj następujący artykuł: ${articleContent}` }
      ],
      response_format: { type: "json_object" },
    });
    
    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    return analysis;
  } catch (error) {
    console.error("Error analyzing article with OpenAI:", error);
    return null;
  }
}; 