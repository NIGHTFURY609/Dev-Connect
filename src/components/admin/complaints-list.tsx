'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Complaint } from '@/lib/types';
import { format } from 'date-fns';

type ComplaintStatus = Complaint['status'];

export default function ComplaintsList({ initialComplaints }: { initialComplaints: Complaint[] }) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const handleStatusChange = (complaintId: string, newStatus: ComplaintStatus) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  const getStatusBadgeVariant = (status: ComplaintStatus) => {
    switch (status) {
      case 'New': return 'destructive';
      case 'In Progress': return 'secondary';
      case 'Resolved': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Complaints</CardTitle>
        <CardDescription>
          View and manage all submitted complaints.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Submitted By</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell className="font-medium">{complaint.submittedBy}</TableCell>
                <TableCell>
                  <Badge variant="outline">{complaint.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{complaint.description}</TableCell>
                <TableCell>{format(complaint.createdAt, 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <Select
                    value={complaint.status}
                    onValueChange={(value: ComplaintStatus) => handleStatusChange(complaint.id, value)}
                  >
                    <SelectTrigger className="w-36">
                       <Badge variant={getStatusBadgeVariant(complaint.status)} className="w-full justify-center">
                          {complaint.status}
                       </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
