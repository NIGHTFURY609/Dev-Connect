'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { provideFeedbackOnContributions, FeedbackOnContributionsOutput } from '@/ai/flows/provide-feedback-on-contributions';
import { Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const exampleContribution = `feat: implement dark mode toggle

Implemented a dark mode toggle using React Context and localStorage for persistence. 
Added a new theme provider and updated CSS variables for both light and dark themes. 
The toggle button is in the header.

Resolves #42
`;

type FeedbackCategory = keyof FeedbackOnContributionsOutput;

const feedbackCategories: { key: FeedbackCategory, label: string }[] = [
    { key: 'sentimentFeedback', label: 'Sentiment' },
    { key: 'professionalismFeedback', label: 'Professionalism' },
    { key: 'technicalExpertiseFeedback', label: 'Technical Expertise' },
    { key: 'collaborationFeedback', label: 'Collaboration' },
];

export default function FeedbackCard() {
  const [contributionText, setContributionText] = useState(exampleContribution);
  const [result, setResult] = useState<FeedbackOnContributionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await provideFeedbackOnContributions({ contributionsText: contributionText });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Generating Feedback",
        description: "There was an issue with the AI service. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          AI Contribution Feedback
        </CardTitle>
        <CardDescription>
          Get AI-powered feedback on your contributions, pull requests, or code comments.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            placeholder="Paste your contribution text here..."
            className="min-h-[150px] font-mono text-sm"
            value={contributionText}
            onChange={(e) => setContributionText(e.target.value)}
            disabled={isLoading}
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Get Feedback'}
          </Button>
        </CardFooter>
      </form>
      {(isLoading || result) && (
        <CardContent>
          <div className="space-y-4 pt-4 border-t">
            {isLoading && (
              <div className="space-y-4">
                {feedbackCategories.map(cat => (
                    <div key={cat.key}>
                        <Skeleton className="h-5 w-1/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                    </div>
                ))}
              </div>
            )}
            {result && (
              <div className="space-y-4">
                {feedbackCategories.map(cat => (
                    <div key={cat.key}>
                        <h4 className="font-semibold">{cat.label}</h4>
                        <p className="text-sm text-muted-foreground">{result[cat.key]}</p>
                    </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
