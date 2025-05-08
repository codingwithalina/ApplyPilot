import { useJobs } from "@/context/JobsContext";
import { JobCard } from "./JobCard";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function JobList() {
  const { jobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Input
          placeholder="Search jobs by title, company, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No jobs found matching your search.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
