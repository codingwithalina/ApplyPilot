import { useEffect, useState } from 'react';
import { requireUser } from '@/utils/requireUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Plus, History, ChevronRight, Star, Mail, BarChart, 
  Settings, CheckCircle2, AlertCircle, Bell, Download, ExternalLink,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Profile, Resume, JobListing } from '@/types';
import { supabase } from '@/lib/supabase';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Application {
  id: string;
  job_id: string;
  status: 'draft' | 'submitted' | 'in_progress';
  created_at: string;
  job_title?: string;
  company?: string;
}

interface DashboardStats {
  totalApplications: number;
  successRate: number;
  wishlistCount: number;
}

interface ProfileField {
  name: string;
  label: string;
  completed: boolean;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<JobListing[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    successRate: 0,
    wishlistCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        // Load profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Load resume - modified to handle multiple resumes
        const { data: resumeData } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Load applications - using correct table name
        const { data: applicationsData } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setProfile(profileData);
        setResume(resumeData);
        setApplications(applicationsData || []);
        
        // In a real app, these would be actual database queries
        setStats({
          totalApplications: applicationsData?.length || 0,
          successRate: 25,
          wishlistCount: 5
        });

        // For demo purposes, using dummy recommended jobs based on profile
        if (profileData?.desired_title) {
          // In a real app, this would be a proper job matching algorithm
          setRecommendedJobs([
            {
              id: 'rec-1',
              title: profileData.desired_title,
              company: 'TechCorp Inc.',
              location: profileData.location || 'Remote',
              salary: `$${profileData.salary_min} - $${profileData.salary_max}`,
              description: 'Perfect match for your profile!',
              requirements: ['Experience in ' + profileData.skills],
              posted: new Date().toISOString()
            },
            {
              id: 'rec-2',
              title: 'Senior ' + profileData.desired_title,
              company: 'InnovateTech',
              location: profileData.location || 'Remote',
              salary: `$${profileData.salary_min + 20000} - $${profileData.salary_max + 30000}`,
              description: 'Great opportunity for career growth!',
              requirements: ['Advanced ' + profileData.skills],
              posted: new Date().toISOString()
            }
          ]);
        }

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const profileFields: ProfileField[] = [
    { name: 'full_name', label: 'Full Name', completed: Boolean(profile?.full_name) },
    { name: 'desired_title', label: 'Desired Job Title', completed: Boolean(profile?.desired_title) },
    { name: 'location', label: 'Location', completed: Boolean(profile?.location) },
    { name: 'salary_min', label: 'Minimum Salary', completed: Boolean(profile?.salary_min) },
    { name: 'salary_max', label: 'Maximum Salary', completed: Boolean(profile?.salary_max) },
    { name: 'skills', label: 'Skills', completed: Boolean(profile?.skills) },
    { name: 'resume', label: 'Resume', completed: Boolean(resume) },
  ];

  const completedFields = profileFields.filter(field => field.completed).length;
  const totalFields = profileFields.length;
  const profileCompletionPercentage = (completedFields / totalFields) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'submitted':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'submitted':
        return 'Submitted';
      case 'in_progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.full_name || profile?.desired_title || 'User'}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Last activity: Today at 9:30 AM
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={jobAlerts}
                onCheckedChange={setJobAlerts}
                className="data-[state=checked]:bg-applypilot-green"
              />
              <Button asChild className="bg-gradient-to-r from-applypilot-teal to-applypilot-green">
                <Link to="/jobs">
                  <Plus className="w-4 h-4 mr-2" />
                  Find Jobs
                </Link>
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Profile Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedFields} of {totalFields} fields completed
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/profile">Complete Profile</Link>
                </Button>
              </div>
              <Progress value={profileCompletionPercentage} className="h-2 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profileFields.map(field => (
                  <Tooltip key={field.name}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 text-sm">
                        {field.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                        {field.label}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {field.completed ? 
                        `${field.label} is completed` : 
                        `Click to add your ${field.label.toLowerCase()}`
                      }
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Applications Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2 text-applypilot-blue" />
                My Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No applications yet</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link to="/jobs">Start Applying</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div 
                      key={application.id} 
                      className="flex items-center justify-between p-4 rounded-lg border bg-card"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{application.job_title || "Software Engineer"}</h4>
                        <p className="text-sm text-muted-foreground">{application.company || "TechCorp Inc."}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(application.status)}
                          >
                            {getStatusText(application.status)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Applied {new Date(application.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Resume
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Cover Letter
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-applypilot-teal" />
                  Resume
                </div>
                {resume && (
                  <span className="text-sm text-muted-foreground">
                    Updated {new Date(resume.updated_at).toLocaleDateString()}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resume ? (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden h-[300px] mb-4">
                    <iframe
                      src={resume.file_url}
                      className="w-full h-full"
                      title="Resume Preview"
                      allow="fullscreen"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your resume is ready for applications
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild>
                      <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/resume/upload')}
                    >
                      Update Resume
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                  <p className="text-muted-foreground mb-4">No resume uploaded yet</p>
                  <Button asChild>
                    <Link to="/resume/upload">Upload Resume</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2 text-applypilot-blue" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No recent applications</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Jobs and Recommended Jobs */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Saved Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Star className="w-5 h-5 mr-2 text-applypilot-teal" />
                Saved Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No saved jobs yet</p>
                <Button variant="link" asChild className="mt-2">
                  <Link to="/jobs">Discover Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-applypilot-green" />
                Recommended Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendedJobs.length > 0 ? (
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                              {job.salary}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/jobs/${job.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>Complete your profile to get personalized recommendations</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link to="/profile">Update Profile</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Checklist Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-applypilot-teal" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!resume && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Upload your resume to start applying for jobs</span>
                  <Button variant="link" asChild className="ml-auto">
                    <Link to="/resume/upload">Upload</Link>
                  </Button>
                </div>
              )}
              {!profile?.desired_title && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Set your desired job title to get better matches</span>
                  <Button variant="link" asChild className="ml-auto">
                    <Link to="/profile">Update</Link>
                  </Button>
                </div>
              )}
              {!profile?.skills && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span>Add your skills to improve recommendations</span>
                  <Button variant="link" asChild className="ml-auto">
                    <Link to="/profile">Add Skills</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings Quick Access */}
        <div className="flex justify-end mt-6">
          <Button variant="outline" asChild className="text-muted-foreground">
            <Link to="/settings">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;