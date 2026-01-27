import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Use OpenRouter for access to multiple models
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert Australian government tender response writer. You help businesses win government contracts by writing professional, compliant tender responses.

Your responses should:
1. Address selection criteria directly and specifically
2. Use clear, professional language
3. Include specific examples and evidence where possible
4. Follow Australian government tender conventions
5. Be structured with clear headings and sections
6. Demonstrate understanding of the requirements
7. Highlight relevant experience and capabilities

Format your response with:
- Clear section headings
- Bullet points where appropriate
- Specific, measurable claims
- Professional tone throughout

If company information is provided, incorporate it naturally. If not, use placeholder sections marked with [COMPANY NAME] or [INSERT SPECIFIC DETAILS] that the user can fill in.`;

export async function POST(req: Request) {
  try {
    const { requirements, companyInfo } = await req.json();

    if (!requirements) {
      return new Response('Requirements are required', { status: 400 });
    }

    const userPrompt = `Please write a professional tender response for the following requirements:

TENDER REQUIREMENTS:
${requirements}

${companyInfo ? `COMPANY INFORMATION:
${companyInfo}` : 'Note: No company information provided. Please use [COMPANY NAME] placeholders.'}

Please generate a comprehensive, professional tender response that addresses all the requirements and selection criteria.`;

    const result = streamText({
      model: openrouter('anthropic/claude-sonnet-4'),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      maxOutputTokens: 4000,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating response:', error);
    return new Response('Error generating response', { status: 500 });
  }
}
