import type { LegData, GeminiExtractionResult } from '../types';
import { storageService } from './storageService';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const EXTRACTION_PROMPT = `
Você é um especialista em análise de betslips (comprovantes de apostas esportivas).

Analise a imagem do betslip e extraia as seguintes informações em formato JSON:

{
  "eventName": "Nome do evento/partida (ex: Real Madrid vs Barcelona)",
  "selection": "A seleção/entrada da aposta (ex: Real Madrid ML, Over 2.5 Goals, Handicap -1.5)",
  "odds": numero_decimal (ex: 2.15),
  "stake": valor_apostado_em_numero (ex: 100.00),
  "eventDate": "Data e hora do evento no formato YYYY-MM-DD HH:mm",
  "bookmaker": "Nome da casa de apostas se visível (ex: Bet365, Betano, 1xBet)",
  "confidence": numero_de_0_a_100 (sua confiança na extração)
}

REGRAS IMPORTANTES:
1. Se não conseguir identificar algum campo, use null
2. Odds devem estar em formato decimal (não fracionário)
3. Para stake, extraia apenas o número, sem símbolo de moeda
4. Se a data não estiver visível, use null
5. Seja preciso - é melhor retornar null do que um valor incorreto

Retorne APENAS o JSON, sem markdown ou explicações adicionais.
`;

export async function extractBetslipData(
  imageBase64: string
): Promise<GeminiExtractionResult> {
  const apiKey = await storageService.getApiKey();

  if (!apiKey) {
    return {
      success: false,
      error: 'API key não configurada. Vá para configurações.',
    };
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: EXTRACTION_PROMPT },
              {
                inline_data: {
                  mime_type: 'image/png',
                  data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const result: GeminiResponse = await response.json();
    const textResponse = result.candidates[0]?.content?.parts[0]?.text;

    if (!textResponse) {
      throw new Error('Resposta vazia do Gemini');
    }

    const cleanedResponse = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const data = JSON.parse(cleanedResponse) as LegData;

    return {
      success: true,
      data,
      rawResponse: textResponse,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

export async function extractWithRetry(
  imageBase64: string,
  maxRetries: number = 3
): Promise<GeminiExtractionResult> {
  let lastError: string | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const result = await extractBetslipData(imageBase64);

    if (result.success) {
      return result;
    }

    lastError = result.error || 'Erro desconhecido';

    if (
      !lastError.includes('network') &&
      !lastError.includes('429') &&
      !lastError.includes('500')
    ) {
      return result;
    }

    await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
  }

  return {
    success: false,
    error: lastError || 'Número máximo de tentativas excedido',
  };
}
