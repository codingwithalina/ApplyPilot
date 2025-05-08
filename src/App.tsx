import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileProvider } from "@/context/ProfileContext";
import { JobsProvider } from "@/context/JobsContext";
import { CoverLetterProvider } from "@/context/CoverLetterContext";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ApplicationPage from "./pages/ApplicationPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
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
                        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Homepage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/jobs" element={<JobsPage />} />
                        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
                        <Route path="/apply/:jobId" element={<ApplicationPage />} />
                        <Route path="/confirmation" element={<ConfirmationPage />} />
                        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
                        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
                        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" replace />} />
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
};

export default App