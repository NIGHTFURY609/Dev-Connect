// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Analyzes developer profiles, aggregates content from platforms like GitHub, and uses the Gemini API to evaluate expertise, collaboration, and professionalism, generating a Trust Score.
 *
 * - trustScoreAnalysis - A function that handles the trust score analysis process.
 * - TrustScoreAnalysisInput - The input type for the trustScoreAnalysis function.
 * - TrustScoreAnalysisOutput - The return type for the trustScoreAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrustScoreAnalysisInputSchema = z.object({
  githubProfileUrl: z.string().describe('The URL of the developer\'s GitHub profile.'),
  otherProfileUrls: z.array(z.string()).describe('An array of URLs for the developer\'s other public profiles (e.g., LinkedIn, Stack Overflow).'),
});
export type TrustScoreAnalysisInput = z.infer<typeof TrustScoreAnalysisInputSchema>;

const TrustScoreAnalysisOutputSchema = z.object({
  trustScore: z.number().describe('A numerical score representing the developer\'s overall trustworthiness and reputation.'),
  feedback: z.string().describe('AI-generated feedback on the developer\'s strengths and areas for improvement.'),
  expertiseScore: z.number().describe('A score representing the developer\'s expertise based on their contributions and skills.'),
  collaborationScore: z.number().describe('A score representing the developer\'s collaboration skills based on their contributions and interactions.'),
  professionalismScore: z.number().describe('A score representing the developer\'s professionalism based on their online presence.'),
});
export type TrustScoreAnalysisOutput = z.infer<typeof TrustScoreAnalysisOutputSchema>;

export async function trustScoreAnalysis(input: TrustScoreAnalysisInput): Promise<TrustScoreAnalysisOutput> {
  return trustScoreAnalysisFlow(input);
}

const trustScoreAnalysisPrompt = ai.definePrompt({
  name: 'trustScoreAnalysisPrompt',
  input: {schema: TrustScoreAnalysisInputSchema},
  output: {schema: TrustScoreAnalysisOutputSchema},
  prompt: `You are an AI reputation analysis expert. You will analyze developer profiles from GitHub and other sources, and generate a Trust Score along with feedback.

Analyze the following profiles to determine the developer's expertise, collaboration, and professionalism, and generate a Trust Score (0-100), expertiseScore (0-100), collaborationScore (0-100), and professionalismScore (0-100).

GitHub Profile: {{{githubProfileUrl}}}
Other Profiles: {{#each otherProfileUrls}}{{{this}}} {{/each}}

Provide constructive feedback on the developer's strengths and areas for improvement. Output in JSON format.
`,
});

const trustScoreAnalysisFlow = ai.defineFlow(
  {
    name: 'trustScoreAnalysisFlow',
    inputSchema: TrustScoreAnalysisInputSchema,
    outputSchema: TrustScoreAnalysisOutputSchema,
  },
  async input => {
    const {output} = await trustScoreAnalysisPrompt(input);
    return output!;
  }
);
