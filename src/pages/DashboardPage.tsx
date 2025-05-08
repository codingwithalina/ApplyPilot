import { useEffect, useState } from 'react';
import { requireUser } from '@/utils/requireUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, History, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resume Dashboard</h1>
          <Button asChild className="bg-gradient-to-r from-applypilot-teal to-applypilot-green border-0">
            <Link to="/resume/new">
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Link>
          </Button>
        </div>

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

          {/* Recent Resumes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <History className="w-5 h-5 mr-2 text-applypilot-green" />
                Recent Resumes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Show message if no resumes */}
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No resumes created yet</p>
                  <Button 
                    variant="link" 
                    asChild 
                    className="mt-2 text-applypilot-teal"
                  >
                    <Link to="/resume/new">Create your first resume</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-applypilot-teal/10 to-applypilot-green/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Tips for a Great Resume</h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Keep your resume concise and focused</li>
                <li>Highlight your achievements with specific metrics</li>
                <li>Tailor your resume for each job application</li>
                <li>Use keywords from the job description</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;