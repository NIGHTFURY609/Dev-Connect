import ComplaintForm from "@/components/complaints/complaint-form";

export default function ComplaintsPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Submit a Complaint</h1>
        <p className="text-muted-foreground">We value your feedback. Please let us know if you encounter any issues.</p>
      </div>
      <div className="mt-8">
        <ComplaintForm />
      </div>
    </div>
  );
}
