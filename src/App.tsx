import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import { JobsProvider } from "@/context/JobsContext";
import { CoverLetterProvider } from "@/context/CoverLetterContext";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";

import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplicationPage from "./pages/ApplicationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ProfileProvider>
        <JobsProvider>
          <CoverLetterProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                  <NavBar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/jobs" element={<JobsPage />} />
                      <Route path="/jobs/:jobId" element={<JobDetailPage />} />
                      <Route path="/apply/:jobId" element={<ApplicationPage />} />
                      <Route path="/confirmation" element={<ConfirmationPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </CoverLetterProvider>
        </JobsProvider>
      </ProfileProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
