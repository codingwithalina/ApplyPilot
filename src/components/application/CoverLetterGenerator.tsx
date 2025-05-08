import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "@/context/JobsContext";
import { useProfile } from "@/context/ProfileContext";
import { useCoverLetter } from "@/context/CoverLetterContext";
import { generateCoverLetter } from "@/utils/coverLetterGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function CoverLetterGenerator() {
  const navigate = useNavigate();
  const { selectedJob } = useJobs();
  const { profile } = useProfile();
  const { coverLetter, setCoverLetter, generating, setGenerating } = useCoverLetter();
  const [editedCoverLetter, setEditedCoverLetter] = useState(coverLetter);

  useEffect(() => {
    setEditedCoverLetter(coverLetter);
  }, [coverLetter]);

  if (!selectedJob || !profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Error</h2>
        <p className="mt-4 text-muted-foreground">
          Job or profile information is missing.
        </p>
        <Button className="mt-6" onClick={() => navigate("/jobs")}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  const handleGenerateCoverLetter = async () => {
    setGenerating(true);
    try {
      const letter = await generateCoverLetter(profile, selectedJob);
      setCoverLetter(letter);
      toast.success("Cover letter generated successfully!");
    } catch (error) {
      toast.error("Failed to generate cover letter. Please try again.");
      console.error("Error generating cover letter:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveEdits = () => {
    setCoverLetter(editedCoverLetter);
    toast.success("Cover letter saved!");
  };

  const handleSendApplication = () => {
    // In a real application, this would send the application
    toast.success("Application sent successfully!");
    navigate("/confirmation");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cover Letter Generator</CardTitle>
        <CardDescription>
          Generate a personalized cover letter for {selectedJob.title} at {selectedJob.company}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Cover Letter</h3>
            <Button
              onClick={handleGenerateCoverLetter}
              disabled={generating}
              variant="outline"
            >
              {generating ? "Generating..." : coverLetter ? "Regenerate" : "Generate Cover Letter"}
            </Button>
          </div>
          
          <Textarea
            value={editedCoverLetter}
            onChange={(e) => setEditedCoverLetter(e.target.value)}
            placeholder={generating ? "Generating your cover letter..." : "Your cover letter will appear here after generation"}
            className="min-h-[400px] p-4 leading-relaxed"
            disabled={generating}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          variant="outline"
          onClick={handleSaveEdits}
          disabled={!coverLetter || generating}
        >
          Save Edits
        </Button>
        <Button
          onClick={handleSendApplication}
          disabled={!coverLetter || generating}
        >
          Send Application
        </Button>
      </CardFooter>
    </Card>
  );
}
