import { useEffect, useState } from 'react';
import { requireUser } from '@/utils/requireUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Heart, FileText, ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await requireUser();
        setUserData(data);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
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

  if (!userData) {
    return null; // Will be redirected by requireUser
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Welcome back, {userData.profile.profession}!
        </h1>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Recommended Jobs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Recommended Jobs
              </CardTitle>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your profile and preferences
                </p>
                <div className="space-y-2">
                  {/* Sample job recommendations */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Senior Developer</p>
                      <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/jobs/job-1">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Full Stack Engineer</p>
                      <p className="text-sm text-muted-foreground">Innovate Solutions</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/jobs/job-2">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/jobs">View All Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Saved Jobs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Saved Jobs
              </CardTitle>
              <Heart className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Jobs you've bookmarked for later
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-center text-muted-foreground">
                    No saved jobs yet
                  </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                Applications
              </CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Track your job applications
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Frontend Developer</p>
                      <p className="text-sm text-muted-foreground">Status: Pending</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View All Applications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;