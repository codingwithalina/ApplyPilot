import { useJobs } from "@/context/JobsContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import { toast } from "sonner";

export function JobDetail() {
  const navigate = useNavigate();
  const { selectedJob } = useJobs();
  const { profile } = useProfile();

  if (!selectedJob) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <p className="mt-4 text-muted-foreground">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-6" onClick={() => navigate("/jobs")}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  const handleApply = () => {
    if (!profile) {
      toast.error("Please create your profile first");
      navigate("/profile");
      return;
    }
    
    navigate(`/apply/${selectedJob.id}`);
  };

  // Format posted date
  const formattedDate = new Date(selectedJob.posted).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => navigate("/jobs")}
      >
        ← Back to Jobs
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">{selectedJob.title}</CardTitle>
              <CardDescription className="text-lg font-medium mt-1">
                {selectedJob.company}
              </CardDescription>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline">Posted on {formattedDate}</Badge>
              </div>
            </div>
            <Button onClick={handleApply} className="md:self-start">
              Apply Now
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{selectedJob.location}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>{selectedJob.salary}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p>{selectedJob.description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {selectedJob.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button onClick={handleApply} className="w-full">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
