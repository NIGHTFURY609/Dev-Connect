'use server';

/**
 * @fileOverview An AI agent for matching developers with suitable projects based on their Trust Score and skills.
 *
 * - aiProjectMatching - A function that handles the project matching process.
 * - AIProjectMatchingInput - The input type for the aiProjectMatching function.
 * - AIProjectMatchingOutput - The return type for the aiProjectMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProjectMatchingInputSchema = z.object({
  developerProfile: z.object({
    trustScore: z.number().describe('The developer trust score.'),
    skills: z.array(z.string()).describe('The skills of the developer.'),
  }).describe('The developer profile including trust score and skills.'),
  projectListings: z.array(z.object({
    projectId: z.string().describe('The project ID.'),
    company: z.string().describe('The company offering the project.'),
    requiredSkills: z.array(z.string()).describe('The required skills for the project.'),
    details: z.string().describe('The project details.'),
  })).describe('The list of project listings with company information, required skills, and project details.'),
});
export type AIProjectMatchingInput = z.infer<typeof AIProjectMatchingInputSchema>;

const AIProjectMatchingOutputSchema = z.array(z.object({
  projectId: z.string().describe('The project ID.'),
  compatibilityScore: z.number().describe('The compatibility score between the developer and the project.'),
  reasoning: z.string().describe('The reasoning behind the compatibility score.'),
})).describe('The list of matched projects with compatibility scores and reasoning.');
export type AIProjectMatchingOutput = z.infer<typeof AIProjectMatchingOutputSchema>;

export async function aiProjectMatching(input: AIProjectMatchingInput): Promise<AIProjectMatchingOutput> {
  return aiProjectMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProjectMatchingPrompt',
  input: {schema: AIProjectMatchingInputSchema},
  output: {schema: AIProjectMatchingOutputSchema},
  prompt: `You are an AI expert in matching developers to projects based on their skills and trust score.

You are provided with a developer profile and a list of projects.
Your goal is to assess the fit between the developer and each project, assigning a compatibility score between 0 and 1 and provide reasoning for each score.

Developer Profile:
Trust Score: {{{developerProfile.trustScore}}}
Skills: {{#each developerProfile.skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Project Listings:
{{#each projectListings}}
Project ID: {{{projectId}}}
Company: {{{company}}}
Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Details: {{{details}}}
{{/each}}

Assess the compatibility of the developer for each project, considering both the skills match and the trust score. Prioritize projects where the developer's skills align well with the required skills and the trust score is high.

Return a JSON array of matched projects, each including the project ID, a compatibility score (0 to 1), and a brief reasoning for the score. If there is no match at all, then you must return an empty array.
`,
});

const aiProjectMatchingFlow = ai.defineFlow(
  {
    name: 'aiProjectMatchingFlow',
    inputSchema: AIProjectMatchingInputSchema,
    outputSchema: AIProjectMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
