import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';
import { mockProjects, mockCurrentUser } from '@/lib/mock-data';
import Image from 'next/image';

const calculateMatchScore = (developerSkills: string[], projectSkills: string[]) => {
  const commonSkills = developerSkills.filter(skill => projectSkills.includes(skill));
  return Math.round((commonSkills.length / projectSkills.length) * 100);
};

export default function ProjectMatchesCard() {
  const matchedProjects = mockProjects
    .map(project => ({
      ...project,
      matchScore: calculateMatchScore(mockCurrentUser.skills, project.requiredSkills),
    }))
    .filter(project => project.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Potential Project Matches
        </CardTitle>
        <CardDescription>
          Projects that align with your skills and expertise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matchedProjects.length > 0 ? (
            matchedProjects.map(project => (
              <div key={project.id} className="p-4 rounded-lg border flex items-start gap-4 transition-colors hover:bg-muted/50">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image src={`https://placehold.co/48x48.png`} alt={`${project.companyName} logo`} layout="fill" className="rounded-md object-cover" data-ai-hint="company logo" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.companyName}</p>
                    </div>
                    <Badge variant={project.matchScore > 75 ? 'default' : 'secondary'} className="bg-accent text-accent-foreground">
                      {project.matchScore}% Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.requiredSkills.map(skill => (
                      <Badge key={skill} variant={mockCurrentUser.skills.includes(skill) ? 'default' : 'outline'} className={mockCurrentUser.skills.includes(skill) ? 'bg-primary/20 text-primary-foreground border-primary/30' : ''}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-muted-foreground py-8">No matching projects found at the moment.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
