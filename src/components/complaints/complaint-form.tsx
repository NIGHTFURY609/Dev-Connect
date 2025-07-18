'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const complaintSchema = z.object({
  category: z.enum(['Bug Report', 'Feature Request', 'Account Issue', 'General Feedback'], {
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters."
  }),
});

export default function ComplaintForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof complaintSchema>) {
    console.log(data);
    toast({
      title: "Complaint Submitted!",
      description: "Thank you for your feedback. We will look into it shortly.",
    });
    form.reset();
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>New Complaint</CardTitle>
            <CardDescription>Fill out the form below to submit your complaint or feedback.</CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Bug Report">Bug Report</SelectItem>
                                <SelectItem value="Feature Request">Feature Request</SelectItem>
                                <SelectItem value="Account Issue">Account Issue</SelectItem>
                                <SelectItem value="General Feedback">General Feedback</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                            <Textarea
                                placeholder="Please describe the issue in detail..."
                                className="min-h-[120px]"
                                {...field}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit Complaint"}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
