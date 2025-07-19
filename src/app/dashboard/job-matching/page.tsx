'use client';

import { useState } from 'react';
import { AIProjectMatchingOutput } from '@/ai/flows/ai-project-matching';
import { findProjectMatches } from '@/app/actions';
import { jobListings, Project } from '@/lib/data';
import { useDeveloperProfile } from '@/context/developer-profile-context';
import { useToast } from '@/hooks/use-toast';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Sparkles, Star } from 'lucide-react';
import { Header } from '@/components/header';

type JobWithMatch = Project & {
  match?: {
    compatibilityScore: number;
    reasoning: string;
  };
};

export default function JobMatchingPage() {
  const [matchedJobs, setMatchedJobs] = useState<JobWithMatch[]>(jobListings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { developerProfile } = useDeveloperProfile();

  const handleMatchmaking = async () => {
    if (!developerProfile) {
        toast({
            variant: 'destructive',
            title: 'Profile Not Found',
            description: 'Please analyze a profile on the dashboard first.',
        });
        return;
    }
    
    setIsLoading(true);
    try {
      const result: AIProjectMatchingOutput = await findProjectMatches({
        developerProfile: {
          trustScore: developerProfile.trustScore,
          skills: developerProfile.skills,
        },
        projectListings: jobListings.map(job => ({ ...job, details: job.details || '' })),
      });

      const newMatchedJobs = jobListings.map((job) => {
        const match = result.find((p) => p.projectId === job.projectId);
        return { ...job, match: match };
      }).sort((a, b) => (b.match?.compatibilityScore ?? 0) - (a.match?.compatibilityScore ?? 0));
      
      setMatchedJobs(newMatchedJobs);

      toast({
        title: 'Matching Complete!',
        description: 'Jobs have been sorted by compatibility.',
      });

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to find job matches. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header title="Job Matching" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Job Matching</CardTitle>
            <CardDescription>
              Click the button to find jobs that best match your skills and AI Trust Score.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleMatchmaking} disabled={isLoading || !developerProfile}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find Matching Jobs
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matchedJobs.map((job) => (
            <Card key={job.projectId} className="flex flex-col">
              {job.match && (
                 <div className="p-4 bg-accent/10 border-b border-accent/20 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-accent-foreground fill-accent" />
                        <h3 className="font-semibold text-accent-foreground">
                            Top Match: {(job.match.compatibilityScore * 100).toFixed(0)}% Compatible
                        </h3>
                    </div>
                    <p className="text-xs text-accent-foreground/80 mt-1">{job.match.reasoning}</p>
                 </div>
              )}
              <CardHeader className="flex-row items-center gap-4">
                 <Avatar className="h-14 w-14 border" data-ai-hint="company logo">
                    {job.logoUrl && <AvatarImage src={job.logoUrl} alt={job.company} />}
                    <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{job.details}</p>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={job.match ? 'default' : 'secondary'}>Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
