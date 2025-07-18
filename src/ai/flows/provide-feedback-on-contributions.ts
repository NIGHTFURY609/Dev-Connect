'use server';
/**
 * @fileOverview Provides feedback on a developer's contributions based on sentiment,
 * professionalism, technical expertise, and collaboration.
 *
 * - provideFeedbackOnContributions - A function that generates feedback on contributions.
 * - FeedbackOnContributionsInput - The input type for the provideFeedbackOnContributions function.
 * - FeedbackOnContributionsOutput - The return type for the provideFeedbackOnContributions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeedbackOnContributionsInputSchema = z.object({
  contributionsText: z
    .string()
    .describe('The text of the developer contributions to be analyzed.'),
});
export type FeedbackOnContributionsInput = z.infer<
  typeof FeedbackOnContributionsInputSchema
>;

const FeedbackOnContributionsOutputSchema = z.object({
  sentimentFeedback: z.string().describe('Feedback on the sentiment of the contributions.'),
  professionalismFeedback: z
    .string()
    .describe('Feedback on the professionalism of the contributions.'),
  technicalExpertiseFeedback: z
    .string()
    .describe('Feedback on the technical expertise demonstrated in the contributions.'),
  collaborationFeedback: z
    .string()
    .describe('Feedback on the collaboration aspects of the contributions.'),
});
export type FeedbackOnContributionsOutput = z.infer<
  typeof FeedbackOnContributionsOutputSchema
>;

export async function provideFeedbackOnContributions(
  input: FeedbackOnContributionsInput
): Promise<FeedbackOnContributionsOutput> {
  return provideFeedbackOnContributionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feedbackOnContributionsPrompt',
  input: {schema: FeedbackOnContributionsInputSchema},
  output: {schema: FeedbackOnContributionsOutputSchema},
  prompt: `You are an AI assistant providing feedback to developers on their contributions.

  Analyze the following contributions text and provide feedback on sentiment, professionalism,
  technical expertise, and collaboration.

  Contributions Text: {{{contributionsText}}}

  Format your response as follows:

  Sentiment Feedback: [Feedback on the sentiment of the contributions]
  Professionalism Feedback: [Feedback on the professionalism of the contributions]
  Technical Expertise Feedback: [Feedback on the technical expertise demonstrated]
  Collaboration Feedback: [Feedback on the collaboration aspects of the contributions]`,
});

const provideFeedbackOnContributionsFlow = ai.defineFlow(
  {
    name: 'provideFeedbackOnContributionsFlow',
    inputSchema: FeedbackOnContributionsInputSchema,
    outputSchema: FeedbackOnContributionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
