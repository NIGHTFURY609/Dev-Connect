'use server';

/**
 * @fileOverview Calculates a developer's Trust Score based on their public contributions.
 *
 * - calculateTrustScore - A function that calculates the trust score.
 * - CalculateTrustScoreInput - The input type for the calculateTrustScore function.
 * - CalculateTrustScoreOutput - The return type for the calculateTrustScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateTrustScoreInputSchema = z.object({
  developerProfileLink: z
    .string()
    .describe(
      'Link to the developers profile containing their public contributions. This could be a link to their Github, Stack Overflow, or personal website.'
    ),
});
export type CalculateTrustScoreInput = z.infer<typeof CalculateTrustScoreInputSchema>;

const CalculateTrustScoreOutputSchema = z.object({
  trustScore: z
    .number()
    .describe(
      'The calculated trust score, which is a number between 0 and 100, based on the analysis of the developers public contributions. A higher score indicates greater trustworthiness.'
    ),
  breakdown: z
    .object({
      sentiment: z
        .number()
        .describe(
          'A score, which is a number between 0 and 100, reflecting the overall sentiment expressed in the developers public contributions. A higher score indicates more positive sentiment.'
        ),
      professionalism: z
        .number()
        .describe(
          'A score, which is a number between 0 and 100, assessing the level of professionalism demonstrated in the developers public contributions. A higher score indicates greater professionalism.'
        ),
      technicalExpertise: z
        .number()
        .describe(
          'A score, which is a number between 0 and 100, evaluating the technical expertise evident in the developers public contributions. A higher score indicates greater technical expertise.'
        ),
      collaboration: z
        .number()
        .describe(
          'A score, which is a number between 0 and 100, indicating the degree of collaboration displayed in the developers public contributions. A higher score suggests a more collaborative approach.'
        ),
    })
    .describe(
      'A detailed breakdown of the factors contributing to the overall trust score.'
    ),
});
export type CalculateTrustScoreOutput = z.infer<typeof CalculateTrustScoreOutputSchema>;

export async function calculateTrustScore(
  input: CalculateTrustScoreInput
): Promise<CalculateTrustScoreOutput> {
  return calculateTrustScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateTrustScorePrompt',
  input: {schema: CalculateTrustScoreInputSchema},
  output: {schema: CalculateTrustScoreOutputSchema},
  prompt: `You are an AI expert specializing in evaluating developer trustworthiness.

You will analyze the developer's public contributions based on the provided profile link and calculate a Trust Score between 0 and 100.

Consider the following factors:
- Sentiment: Overall positivity and tone of the contributions.
- Professionalism: Level of professionalism demonstrated in the contributions.
- Technical Expertise: Depth and breadth of technical knowledge evident in the contributions.
- Collaboration: Degree of collaboration and teamwork displayed in the contributions.

Provide a breakdown of the factors contributing to the overall Trust Score.

Profile Link: {{{developerProfileLink}}}`,
});

const calculateTrustScoreFlow = ai.defineFlow(
  {
    name: 'calculateTrustScoreFlow',
    inputSchema: CalculateTrustScoreInputSchema,
    outputSchema: CalculateTrustScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
