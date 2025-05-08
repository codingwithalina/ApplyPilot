import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Application Submitted</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your application has been successfully submitted. The employer will contact you if they're interested in your profile.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate("/jobs")} 
            className="w-full"
          >
            Browse More Jobs
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
