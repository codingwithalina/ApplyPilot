import { useEffect, useState } from 'react';
import { requireUser } from '@/utils/requireUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, History, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface Profile {
  full_name: string;
  desired_title: string;
  location: string;
  salary_min: number;
  skills: string[];
}

interface Job {
  id: string;
  title: string;
  company: string;
}

interface Match {
  id: string;
  score: number;
  job: Job;
}

interface WishlistItem {
  id: string;
  job: Job;
}

interface Application {
  id: string;
  status: string;
  cover_url: string;
  job: Job;
}

const DashboardPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Load profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, desired_title, location, salary_min, skills')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          const fields = ['desired_title', 'location', 'salary_min', 'skills'];
          const completionPercentage = Math.round(
            fields.filter(k => profileData[k]).length / fields.length * 100
          );
          setCompletion(completionPercentage);
        }

        // Load matches
        const { data: matchesData } = await supabase
          .from('matches')
          .select('id, score, job:jobs!inner(id,title,company)')
          .eq('user_id', user.id)
          .order('score', { ascending: false });
        setMatches(matchesData || []);

        // Load wishlist
        const { data: wishlistData } = await supabase
          .from('wishlist')
          .select('id, job:jobs(id,title)')
          .eq('user_id', user.id)
          .order('id', { ascending: false });
        setWishlist(wishlistData || []);

        // Load applications
        const { data: applicationsData } = await supabase
          .from('applications')
          .select('id,status,cover_url, job:jobs(id,title)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        setApplications(applicationsData || []);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resume Dashboard</h1>
          <Button asChild className="bg-gradient-to-r from-applypilot-teal to-applypilot-green border-0">
            <Link to="/resume/new">
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Profile Completion Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome, {profile?.full_name || 'User'}!
                </h2>
                <p className="text-muted-foreground">
                  Your profile is {completion}% complete
                  {completion < 100 && (
                    <Button variant="link" asChild className="pl-2 text-applypilot-teal">
                      <Link to="/profile">Complete your profile</Link>
                    </Button>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {profile?.desired_title || 'Set your desired title'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile?.location || 'Set your location'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2 text-applypilot-teal" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/resume/new">
                  Create New Resume
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/resume/templates">
                  Browse Templates
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/resume/analyze">
                  Analyze Existing Resume
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <History className="w-5 h-5 mr-2 text-applypilot-green" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.slice(0, 3).map((application) => (
                    <div key={application.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{application.job.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          Status: {application.status}
                        </p>
                      </div>
                      {application.cover_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={application.cover_url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No recent activity</p>
                  <Button 
                    variant="link" 
                    asChild 
                    className="mt-2 text-applypilot-teal"
                  >
                    <Link to="/resume/new">Create your first resume</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Job Matches Section */}
        {matches.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Recommended Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matches.slice(0, 4).map((match) => (
                  <div key={match.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{match.job.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {match.job.company}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/jobs/${match.job.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;