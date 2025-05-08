import { JobList } from "@/components/jobs/JobList";
import { useProfile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JobsPage = () => {
  const { profile } = useProfile();
  
  return (
    <div className="container mx-auto px-4 py-12">
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
