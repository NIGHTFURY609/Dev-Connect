'use client';

import { useDeveloperProfile } from '@/context/developer-profile-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Link as LinkIcon, Edit, Loader2, Code, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Progress } from '@/components/ui/progress';

const iconMap: { [key: string]: React.ElementType } = {
  Github: Github,
  Linkedin: Linkedin,
  Stackoverflow: MessageSquare,
  Leetcode: Code,
  Default: LinkIcon,
};

export default function ProfilePage() {
  const { developerProfile } = useDeveloperProfile();

  if (!developerProfile) {
    return (
        <div className="flex flex-1 flex-col">
            <Header title="Profile" />
            <main className="flex-1 p-4 md:p-6 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </main>
        </div>
    )
  }

  const socialLinks = [
    { name: 'GitHub', url: developerProfile.githubProfileUrl, icon: Github, isPrimary: true },
    { name: 'LinkedIn', url: developerProfile.linkedinProfileUrl, icon: Linkedin },
    { name: 'Stack Overflow', url: developerProfile.stackoverflowProfileUrl, icon: MessageSquare },
    { name: 'LeetCode', url: developerProfile.leetcodeProfileUrl, icon: Code },
  ].filter(link => link.url);


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
                    {socialLinks.map((link) => {
                         const Icon = link.icon || iconMap.Default;
                        return (
                            <li key={link.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-5 w-5 text-muted-foreground" />
                                    <Link href={link.url} className="font-medium hover:underline" target="_blank">
                                        {link.url.replace('https://', '')}
                                    </Link>
                                </div>
                                {link.isPrimary && <Badge variant="secondary">Primary</Badge>}
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
