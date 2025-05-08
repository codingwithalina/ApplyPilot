import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const { profile, updateProfile } = useProfile();
  
  const [profession, setProfession] = useState(profile?.profession || "");
  const [salary, setSalary] = useState<number>(profile?.salary || 0);
  const [location, setLocation] = useState(profile?.location || "");
  const [resumeFile, setResumeFile] = useState<File | null>(profile?.resumeFile || null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(profile?.coverLetterFile || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profession || !salary || !location || !resumeFile) {
      toast.error("Please fill all required fields and upload your resume");
      return;
    }
    
    updateProfile({
      profession,
      salary,
      location,
      resumeFile,
      coverLetterFile,
    });
    
    toast.success("Profile created successfully!");
    navigate("/jobs");
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>
          Complete your profile to discover job opportunities and create personalized cover letters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profession">Desired Profession / Field *</Label>
            <Input
              id="profession"
              placeholder="e.g. Software Developer, UX Designer"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="salary">Expected Salary ($ per year) *</Label>
            <Input
              id="salary"
              type="number"
              placeholder="e.g. 80000"
              value={salary || ""}
              onChange={(e) => setSalary(parseInt(e.target.value) || 0)}
              required
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location Preference *</Label>
            <Select value={location} onValueChange={setLocation} required>
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
          
          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume (PDF) *</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              required={!resumeFile}
              className="cursor-pointer"
            />
            {resumeFile && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {resumeFile.name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Upload Cover Letter (PDF, Optional)</Label>
            <Input
              id="coverLetter"
              type="file"
              accept=".pdf"
              onChange={handleCoverLetterUpload}
              className="cursor-pointer"
            />
            {coverLetterFile && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {coverLetterFile.name}
              </p>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full">Create Profile</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
