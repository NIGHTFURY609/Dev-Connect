import { mockProjects, mockDevelopers } from '@/lib/mock-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

const calculateMatchScore = (developerSkills: string[], projectSkills: string[]) => {
  if (projectSkills.length === 0) return 0;
  const commonSkills = developerSkills.filter(skill => projectSkills.includes(skill));
  return Math.round((commonSkills.length / projectSkills.length) * 100);
};

export default function ProjectList() {
  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
      {mockProjects.map(project => {
        const matchedDevelopers = mockDevelopers
          .map(dev => ({
            ...dev,
            matchScore: calculateMatchScore(dev.skills, project.requiredSkills),
          }))
          .filter(dev => dev.matchScore > 0)
          .sort((a, b) => b.matchScore - a.matchScore);

        return (
          <Card key={project.id}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex-shrink-0">
                         <Image src={`https://placehold.co/56x56.png`} alt={`${project.companyName} logo`} layout="fill" className="rounded-lg object-cover" data-ai-hint="company logo" />
                    </div>
                    <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.companyName}</CardDescription>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground pt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.requiredSkills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-3 text-sm">Matched Developers</h4>
              <div className="space-y-4">
                {matchedDevelopers.length > 0 ? matchedDevelopers.slice(0, 3).map(dev => (
                  <div key={dev.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={dev.avatar} alt={dev.name} />
                      <AvatarFallback>{dev.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{dev.name}</p>
                        <p className="text-xs text-muted-foreground">{dev.matchScore}% Match</p>
                      </div>
                      <Progress value={dev.matchScore} className="h-1.5 mt-1" />
                    </div>
                  </div>
                )) : <p className="text-sm text-center text-muted-foreground py-4">No developers found for this project.</p>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
