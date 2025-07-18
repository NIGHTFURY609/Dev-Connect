import { mockComplaints } from "@/lib/mock-data";
import ComplaintsList from "@/components/admin/complaints-list";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage user-submitted complaints and feedback.</p>
      </div>
      <ComplaintsList initialComplaints={mockComplaints} />
    </div>
  );
}
