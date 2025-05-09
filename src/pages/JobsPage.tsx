import { JobList } from "@/components/jobs/JobList";
import { useProfile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const JobsPage = () => {
  const { profile } = useProfile();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        size="sm" 
        asChild 
        className="mb-6"
      >
        <Link to="/dashboard" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Job Opportunities</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4">
          <p className="text-muted-foreground mb-4 sm:mb-0">
            Discover jobs that match your skills and preferences
          </p>
          {!profile && (
            <Button asChild>
              <Link to="/profile">Create Profile</Link>
            </Button>
          )}
        </div>
      </div>
      
      <JobList />
    </div>
  );
};

export default JobsPage;