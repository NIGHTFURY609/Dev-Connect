import { developerProfile } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Link as LinkIcon, Edit } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Progress } from '@/components/ui/progress';

const iconMap: { [key: string]: React.ElementType } = {
  Github: Github,
  Linkedin: Linkedin,
  Default: LinkIcon,
};

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header title="Profile" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src={developerProfile.avatarUrl} alt={developerProfile.name} data-ai-hint="developer avatar" />
                        <AvatarFallback>{developerProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{developerProfile.name}</CardTitle>
                        <CardDescription>Software Developer from Kerala</CardDescription>
                    </div>
                </div>
                <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4"/>
                    Edit Profile
                </Button>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>AI Trust Score</CardTitle>
                    <CardDescription>Based on public contributions & profiles.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center">
                    <p className="text-7xl font-bold text-primary">{developerProfile.trustScore}</p>
                    <Progress value={developerProfile.trustScore} className="h-3 mt-2" />
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Primary technologies and areas of expertise.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {developerProfile.skills.map((skill) => (
                        <Badge key={skill} variant="default" className="text-sm py-1 px-3">
                            {skill}
                        </Badge>
                    ))}
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
                <CardDescription>Your professional social media and code repository links.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Github className="h-5 w-5 text-muted-foreground" />
                            <Link href={developerProfile.githubProfileUrl} className="font-medium hover:underline" target="_blank">
                                {developerProfile.githubProfileUrl.replace('https://', '')}
                            </Link>
                        </div>
                        <Badge variant="secondary">Primary</Badge>
                    </li>
                    {developerProfile.otherProfileUrls.map((profile) => {
                         const Icon = iconMap[profile.icon] || iconMap.Default;
                        return (
                            <li key={profile.url} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <Link href={profile.url} className="font-medium hover:underline" target="_blank">
                                        {profile.url.replace('https://', '')}
                                    </Link>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
