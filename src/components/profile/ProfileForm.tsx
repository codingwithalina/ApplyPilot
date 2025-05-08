import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function ProfileForm() {
  const navigate = useNavigate();
  const { dbProfile, resume, updateProfile, loading } = useProfile();
  
  const [fullName, setFullName] = useState(dbProfile?.full_name || "");
  const [desiredTitle, setDesiredTitle] = useState(dbProfile?.desired_title || "");
  const [location, setLocation] = useState(dbProfile?.location || "");
  const [salaryMin, setSalaryMin] = useState<number>(dbProfile?.salary_min || 0);
  const [salaryMax, setSalaryMax] = useState<number>(dbProfile?.salary_max || 0);
  const [skills, setSkills] = useState(dbProfile?.skills || "");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skipResume, setSkipResume] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Update form when dbProfile changes
  useEffect(() => {
    if (dbProfile) {
      setFullName(dbProfile.full_name || "");
      setDesiredTitle(dbProfile.desired_title || "");
      setLocation(dbProfile.location || "");
      setSalaryMin(dbProfile.salary_min || 0);
      setSalaryMax(dbProfile.salary_max || 0);
      setSkills(dbProfile.skills || "");
    }
  }, [dbProfile]);

  if (loading) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="py-6">
          <div className="text-center">
            <p>Loading profile...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !desiredTitle || !location || !salaryMin || !salaryMax || !skills) {
      toast.error("Please fill all required fields");
      return;
    }

    if (salaryMin > salaryMax) {
      toast.error("Minimum salary cannot be greater than maximum salary");
      return;
    }

    if (!resume && !resumeFile && !skipResume) {
      toast.error("Please either upload a resume or check 'Skip resume upload'");
      return;
    }
    
    try {
      setSubmitting(true);
      await updateProfile({
        full_name: fullName,
        desired_title: desiredTitle,
        location,
        salary_min: salaryMin,
        salary_max: salaryMax,
        skills,
        resumeFile: skipResume ? null : resumeFile,
      });
      
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
      setResumeFile(file);
      setSkipResume(false); // Uncheck skip resume when file is selected
    }
  };

  const handleSkipResumeChange = (checked: boolean) => {
    setSkipResume(checked);
    if (checked) {
      setResumeFile(null); // Clear selected file when skipping
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{dbProfile ? 'Update Your Profile' : 'Create Your Profile'}</CardTitle>
        <CardDescription>
          Complete your profile to discover job opportunities and create personalized cover letters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="desiredTitle">Desired Job Title *</Label>
            <Input
              id="desiredTitle"
              placeholder="e.g. Software Developer"
              value={desiredTitle}
              onChange={(e) => setDesiredTitle(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location Preference *</Label>
            <Select 
              value={location} 
              onValueChange={setLocation} 
              disabled={submitting}
              required
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select a preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum Salary *</Label>
              <Input
                id="salaryMin"
                type="number"
                placeholder="e.g. 50000"
                value={salaryMin || ""}
                onChange={(e) => setSalaryMin(parseInt(e.target.value) || 0)}
                required
                min="0"
                disabled={submitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum Salary *</Label>
              <Input
                id="salaryMax"
                type="number"
                placeholder="e.g. 80000"
                value={salaryMax || ""}
                onChange={(e) => setSalaryMax(parseInt(e.target.value) || 0)}
                required
                min="0"
                disabled={submitting}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills *</Label>
            <Textarea
              id="skills"
              placeholder="Enter your skills (e.g. JavaScript, React, Node.js)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="skipResume" 
                checked={skipResume}
                onCheckedChange={handleSkipResumeChange}
                disabled={submitting}
              />
              <Label htmlFor="skipResume" className="text-sm font-normal">
                Skip resume upload for now
              </Label>
            </div>

            {!skipResume && (
              <div className="space-y-2">
                <Label htmlFor="resume">Upload Resume (PDF)</Label>
                {resume ? (
                  <div className="space-y-2">
                    <p className="text-sm text-green-600">
                      Current resume: <a href={resume.file_url} target="_blank" rel="noopener noreferrer" className="underline">View</a>
                    </p>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="cursor-pointer"
                      disabled={submitting}
                    />
                  </div>
                ) : (
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="cursor-pointer"
                    disabled={submitting}
                  />
                )}
                {resumeFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {resumeFile.name}
                  </p>
                )}
              </div>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (dbProfile ? 'Update Profile' : 'Create Profile')}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}