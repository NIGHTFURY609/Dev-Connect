import ProjectList from "@/components/projects/project-list";

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Project Marketplace</h1>
        <p className="text-muted-foreground">Discover projects and see how developers match up with requirements.</p>
      </div>
      <ProjectList />
    </div>
  );
}
