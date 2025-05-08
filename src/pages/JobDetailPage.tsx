import { JobDetail } from "@/components/jobs/JobDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useJobs } from "@/context/JobsContext";

const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { selectJob, selectedJob } = useJobs();
  
  useEffect(() => {
    if (jobId) {
      selectJob(jobId);
    } else {
      navigate("/jobs");
    }
  }, [jobId, selectJob, navigate]);
  
  if (!selectedJob) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading job details...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <JobDetail />
    </div>
  );
};

export default JobDetailPage;
