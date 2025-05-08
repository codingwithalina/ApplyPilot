import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobsContext";
import { useProfile } from "@/context/ProfileContext";
import { CoverLetterGenerator } from "@/components/application/CoverLetterGenerator";

const ApplicationPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { selectJob, selectedJob } = useJobs();
  const { profile } = useProfile();
  
  useEffect(() => {
    // Redirect if no profile
    if (!profile) {
      navigate("/profile");
      return;
    }
    
    // Load job if not already loaded
    if (jobId && (!selectedJob || selectedJob.id !== jobId)) {
      selectJob(jobId);
    }
  }, [jobId, profile, selectedJob, selectJob, navigate]);
  
  if (!profile) {
    return null; // Will redirect to profile page
  }
  
  if (!selectedJob) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading application details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Apply for {selectedJob.title}</h1>
          <p className="text-muted-foreground mt-2">
            at {selectedJob.company}
          </p>
        </div>
        
        <CoverLetterGenerator />
      </div>
    </div>
  );
};

export default ApplicationPage;
