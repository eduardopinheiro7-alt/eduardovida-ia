import { GoogleGenAI, Type } from "@google/genai";

// Proteção para garantir que a API Key seja lida corretamente do ambiente do Render
export const getAI = () => {
  const apiKey = process.env.API_KEY || process.env.VITE_GEMINI_API_KEY || "";
  return new GoogleGenAI(apiKey);
};

/**
 * Gera copy de marketing para os lanches
 */
export async function generateSnackMarketing(itemName: string, markup: string) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(
      `Eduardo Pinheiro, professor de matemática e empreendedor na Mauriti, Belém-PA.
      Crie um copy de vendas curto e matador para o item "${itemName}" com preço calculado em markup de ${markup}%.
      Destaque que é feito por um professor que entende de precisão. Use emojis e foque no público local de Belém.`
    );
    return response.response.text();
  } catch (error) {
    console.error(error);
    return "Erro ao gerar copy.";
  }
}

/**
 * Radar de Mercado com Grounding para a CBR 500R
 */
export async function getMotorcycleMarketInfo() {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent({
      contents: [{ role: "user", parts: [{ text: "Qual o preço médio da Honda CBR 500R (2020-2024) no mercado brasileiro hoje? Quais os pontos de atenção na manutenção para quem roda em Belém-PA?" }] }],
      tools: [{ googleSearch: {} }]
    });
    return {
      text: response.response.text(),
      sources: response.response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Gerador de Pack de Estudos Diário
 */
export async function generateDailyStudyPack(focus: string) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mathQuestion: { type: Type.STRING },
            mathAlternatives: { type: Type.ARRAY, items: { type: Type.STRING } },
            mathResolution: { type: Type.STRING }
          },
          required: ["mathQuestion", "mathAlternatives", "mathResolution"]
        }
      }
    }).generateContent(`Gere um pack de estudos para o tema ${focus}. Inclua: 1 Questão Profecia (Nível Difícil), Alternativas A-D e a resolução com a técnica "Pulo do Gato".`);
    
    return JSON.parse(response.response.text() || '{}');
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Analisa dados de editais PSS e fornece parecer estratégico
 */
export async function analyzePSSData(text: string) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(
      `Analise este edital ou contexto de PSS: "${text}". 
      Dê um parecer estratégico para o Professor Eduardo Pinheiro (Belém-PA). 
      Avalie: Salário líquido vs Custo de vida local, Logística saindo de Belém para o local do edital, Impacto na operação iFood/YouTube em Belém.
      Diga de forma direta se vale a pena ou se é apenas um degrau temporário.`
    );
    return { text: response.response.text() };
  } catch (error) {
    console.error(error);
    return { text: "Erro ao realizar análise estratégica do PSS." };
  }
}

/**
 * Gera estratégias de marketing ou copies de anúncios personalizados
 */
export async function generateAdCopy(name: string, campaign: string) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(
      `Atuando como estrategista digital para ${name}, crie uma estratégia de marketing detalhada ou copy persuasivo para: ${campaign}. 
      Considere o contexto regional de Belém-PA e a autoridade técnica em matemática.`
    );
    return response.response.text();
  } catch (error) {
    console.error(error);
    return "Erro ao gerar estratégia de marketing.";
  }
}

/**
 * Gera inteligência de conteúdo para o YouTube baseada em categorias específicas
 */
export async function generateYouTubeIntelligence(params: { type: string, category: string, topic: string }) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(
      `Gere inteligência para canal de YouTube educacional:
      Tipo de Ferramenta: ${params.type}
      Categoria: ${params.category}
      Tema central: ${params.topic}
      Público: Estudantes focados em ENEM, Concursos e interessados em matemática.
      Foco: Autoridade do Prof. Eduardo Pinheiro e o diferencial didático "Pulo do Gato".`
    );
    return response.response.text();
  } catch (error) {
    console.error(error);
    return "Erro ao gerar inteligência de conteúdo para YouTube.";
  }
}

/**
 * Analisa o conteúdo de um vídeo gravado (Envia para o servidor Render)
 */
export async function analyzeVideoBeta(base64: string, mimeType: string, topic: string) {
  try {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const file = new File([blob], "video.mp4", { type: mimeType });

    const formData = new FormData();
    formData.append('video', file);

    // O celular enviará o vídeo para este link do Render
    const response = await fetch("https://eduardovida-ia.vercel.app/analyze-video", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.analysis;

  } catch (error) {
    console.error("Erro no Video Analysis:", error);
    return "Falha ao analisar vídeo no servidor.";
  }
}

/**
 * Gera conteúdo exclusivo para os grupos VIP
 */
export async function generateVipExclusives(type: string, topic: string) {
  const ai = getAI();
  try {
    const response = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(
      `Gere um conteúdo exclusivo para o Grupo VIP do Professor Eduardo Pinheiro.
      Tipo de conteúdo: ${type}
      Tema: ${topic}
      Contexto: Eduardo é professor em Belém-PA, focado em ENEM e concursos, usa a didática "Pulo do Gato".
      O conteúdo deve ser curto, persuasivo e pronto para ser enviado no WhatsApp. Use emojis.`
    );
    return response.response.text();
  } catch (error) {
    console.error(error);
    return "Erro ao gerar conteúdo VIP.";
  }
}

export const geminiService = {
  generateSnackMarketing,
  getMotorcycleMarketInfo,
  generateDailyStudyPack,
  analyzePSSData,
  generateAdCopy,
  generateYouTubeIntelligence,
  analyzeVideoBeta,
  analyzeVideoContent: analyzeVideoBeta,
  generateVipExclusives
};