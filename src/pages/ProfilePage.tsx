import { ProfileForm } from "@/components/profile/ProfileForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild 
          className="mb-6"
        >
          <Link to="/dashboard" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-applypilot-teal to-applypilot-blue bg-clip-text text-transparent">Create Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Complete your profile to get personalized job recommendations and AI-generated cover letters
          </p>
        </div>
        
        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;