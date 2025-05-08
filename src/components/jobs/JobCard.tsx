import { JobListing } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobsContext";

interface JobCardProps {
  job: JobListing;
}

export function JobCard({ job }: JobCardProps) {
  const navigate = useNavigate();
  const { selectJob } = useJobs();
  
  const handleViewJob = () => {
    selectJob(job.id);
    navigate(`/jobs/${job.id}`);
  };
  
  // Calculate posting date to display
  const postedDate = new Date(job.posted);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - postedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium">{job.company}</CardDescription>
          </div>
          <Badge variant="outline">{diffDays} days ago</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {job.salary}
          </div>
          <p className="text-sm mt-3 line-clamp-3">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={handleViewJob} variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
