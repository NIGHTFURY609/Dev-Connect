'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TrustScoreAnalysisOutput } from '@/ai/flows/trust-score-analysis';
import { analyzeTrustScore } from '../actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Github, Loader2, Sparkles } from 'lucide-react';
import { Header } from '@/components/header';

const FormSchema = z.object({
  githubProfileUrl: z.string().url({ message: 'Please enter a valid GitHub profile URL.' }),
});

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<TrustScoreAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      githubProfileUrl: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeTrustScore({
        githubProfileUrl: data.githubProfileUrl,
        otherProfileUrls: [],
      });
      setAnalysisResult(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze the profile. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderAnalysisResult = () => {
    if (isLoading) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      );
    }

    if (!analysisResult) {
      return (
        <Card className="flex flex-col items-center justify-center text-center p-8">
            <CardHeader>
                <div className="mx-auto bg-secondary rounded-full p-3 w-fit">
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>Analyze a GitHub profile to generate an AI Trust Score.</CardDescription>
            </CardHeader>
        </Card>
      )
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center p-6">
          <CardHeader>
            <CardDescription>Overall Trust Score</CardDescription>
            <CardTitle className="text-7xl font-bold text-primary">{analysisResult.trustScore}</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Progress value={analysisResult.trustScore} className="h-3" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Expertise Score: {analysisResult.expertiseScore}</Label>
              <Progress value={analysisResult.expertiseScore} className="mt-2 h-2" />
            </div>
            <div>
              <Label className="text-sm font-medium">Collaboration Score: {analysisResult.collaborationScore}</Label>
              <Progress value={analysisResult.collaborationScore} className="mt-2 h-2" />
            </div>
            <div>
              <Label className="text-sm font-medium">Professionalism Score: {analysisResult.professionalismScore}</Label>
              <Progress value={analysisResult.professionalismScore} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>AI-Generated Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{analysisResult.feedback}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Trust Score Analysis</CardTitle>
            <CardDescription>
              Enter a public GitHub profile URL to analyze and generate a trust score.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-4">
                <FormField
                  control={form.control}
                  name="githubProfileUrl"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="sr-only">GitHub Profile URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="https://github.com/username" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Generate Score'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="animate-in fade-in duration-500">
            {renderAnalysisResult()}
        </div>

      </main>
    </div>
  );
}
