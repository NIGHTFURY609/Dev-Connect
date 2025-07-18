'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateTrustScore, CalculateTrustScoreOutput } from '@/ai/flows/calculate-trust-score';
import { Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCurrentUser } from '@/lib/mock-data';

const scoreCategories: (keyof CalculateTrustScoreOutput['breakdown'])[] = ['sentiment', 'professionalism', 'technicalExpertise', 'collaboration'];

export default function TrustScoreCard() {
  const [profileUrl, setProfileUrl] = useState(mockCurrentUser.profileLink);
  const [result, setResult] = useState<CalculateTrustScoreOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const res = await calculateTrustScore({ developerProfileLink: profileUrl });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Calculating Score",
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
          <Bot className="w-6 h-6" />
          AI Developer Trust Score
        </CardTitle>
        <CardDescription>
          Analyze a public profile (e.g., GitHub) to calculate a developer's trust score.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="profile-url">Developer Profile URL</Label>
            <Input
              id="profile-url"
              placeholder="https://github.com/your-username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Calculate Score'}
          </Button>
        </CardFooter>
      </form>
      {(isLoading || result) && (
        <CardContent>
          <div className="space-y-4 pt-4 border-t">
            {isLoading && (
              <>
                <div className="flex justify-between items-baseline">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-8 w-1/5" />
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="space-y-4 pt-2">
                    {scoreCategories.map(cat => <Skeleton key={cat} className="h-6 w-full" />)}
                </div>
              </>
            )}
            {result && (
              <>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold">Overall Trust Score</h3>
                  <p className="text-3xl font-bold text-primary">{result.trustScore}</p>
                </div>
                <Progress value={result.trustScore} className="h-2" />
                <div className="space-y-3 pt-2">
                  {scoreCategories.map((category) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <p className="capitalize text-muted-foreground">{category.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="font-medium">{result.breakdown[category]}</p>
                      </div>
                      <Progress value={result.breakdown[category]} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
