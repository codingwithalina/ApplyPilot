import { ProfileForm } from "@/components/profile/ProfileForm";

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
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
