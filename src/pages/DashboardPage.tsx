import { useEffect, useState } from 'react';
import { requireUser } from '@/utils/requireUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Plus, History, ChevronRight, Star, Mail, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Profile, Resume } from '@/types';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  totalApplications: number;
  successRate: number;
  wishlistCount: number;
}

const DashboardPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    successRate: 0,
    wishlistCount: 0
  });
  const [loading, setLoading] = useState(true);

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

        // Load resume
        const { data: resumeData } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // Calculate profile completion
        const profileFields = ['full_name', 'desired_title', 'location', 'salary_min', 'salary_max', 'skills'];
        const filledFields = profileFields.filter(field => profileData?.[field]);
        const completionPercentage = (filledFields.length / profileFields.length) * 100;

        setProfile(profileData);
        setResume(resumeData);
        
        // In a real app, these would be actual database queries
        setStats({
          totalApplications: 12,
          successRate: 25,
          wishlistCount: 5
        });

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  const profileCompletionPercentage = profile ? 
    Object.values(profile).filter(Boolean).length / 6 * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {profile?.full_name || 'User'}!
          </h1>
          <div className="mt-4">
            <p className="text-muted-foreground mb-2">Profile Completion</p>
            <Progress value={profileCompletionPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {profileCompletionPercentage.toFixed(0)}% complete
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2 text-applypilot-teal" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resume ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your resume is ready for applications
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild>
                      <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                      </a>
                    </Button>
                    <Button variant="outline">Update Resume</Button>
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

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-applypilot-green" />
                Application Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-applypilot-teal">
                    {stats.totalApplications}
                  </p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-applypilot-green">
                    {stats.successRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-applypilot-blue">
                    {stats.wishlistCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Saved Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
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
        </div>

        {/* Tips Section */}
        <Card className="mt-6 bg-gradient-to-r from-applypilot-teal/10 to-applypilot-green/10">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              {!resume && (
                <li>Upload your resume to start applying for jobs</li>
              )}
              {!profile?.desired_title && (
                <li>Set your desired job title to get better job matches</li>
              )}
              {!profile?.skills && (
                <li>Add your skills to improve job recommendations</li>
              )}
              <li>Browse our latest job opportunities</li>
              <li>Set up job alerts for your preferred positions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;