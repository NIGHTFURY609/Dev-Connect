import TrustScoreCard from "@/components/developer/trust-score-card";
import FeedbackCard from "@/components/developer/feedback-card";
import ProjectMatchesCard from "@/components/developer/project-matches-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome Back, Fathima!</h1>
        <p className="text-muted-foreground">Here's your personalized developer overview.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <TrustScoreCard />
          <FeedbackCard />
        </div>
        <div className="space-y-8">
          <ProjectMatchesCard />
        </div>
      </div>
    </div>
  );
}
