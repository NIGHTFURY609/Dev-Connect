'use server';

import { trustScoreAnalysis, TrustScoreAnalysisInput, TrustScoreAnalysisOutput } from '@/ai/flows/trust-score-analysis';
import { aiProjectMatching, AIProjectMatchingInput, AIProjectMatchingOutput } from '@/ai/flows/ai-project-matching';

export async function analyzeTrustScore(
  input: TrustScoreAnalysisInput
): Promise<TrustScoreAnalysisOutput> {
  try {
    const result = await trustScoreAnalysis(input);
    return result;
  } catch (error) {
    console.error('Error in trustScoreAnalysis:', error);
    throw new Error('Failed to analyze trust score.');
  }
}

export async function findProjectMatches(
  input: AIProjectMatchingInput
): Promise<AIProjectMatchingOutput> {
  try {
    const result = await aiProjectMatching(input);
    return result;
  } catch (error) {
    console.error('Error in aiProjectMatching:', error);
    throw new Error('Failed to find project matches.');
  }
}
