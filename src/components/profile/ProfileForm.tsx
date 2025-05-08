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
  const { profile, dbProfile, resume, updateProfile } = useProfile();
  
  const [profession, setProfession] = useState(profile?.profession || dbProfile?.desired_title || "");
  const [salary, setSalary] = useState<number>(profile?.salary || dbProfile?.salary_min || 0);
  const [location, setLocation] = useState(profile?.location || dbProfile?.location || "");
  const [resumeFile, setResumeFile] = useState<File | null>(profile?.resumeFile || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profession || !salary || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      await updateProfile({
        profession,
        salary,
        location,
        resumeFile,
        coverLetterFile: null,
      });
      
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
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
                />
              </div>
            ) : (
              <Input
                id="resume"
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                required={!resume}
                className="cursor-pointer"
              />
            )}
            {resumeFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full">
              {dbProfile ? 'Update Profile' : 'Create Profile'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}