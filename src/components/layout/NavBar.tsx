import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    
    // Get initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-applypilot-dark dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/codingwithalina/ApplyPilot-with-bolt.diy@main/public/images/logo.png"
              alt="ApplyPilot Logo"
              className="h-10"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-applypilot-teal transition-colors dark:text-gray-300 dark:hover:text-applypilot-teal"
          >
            Home
          </Link>
          {!user && (
            <>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-700 hover:text-applypilot-green transition-colors dark:text-gray-300 dark:hover:text-applypilot-green"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-700 hover:text-applypilot-blue transition-colors dark:text-gray-300 dark:hover:text-applypilot-blue"
              >
                Pricing
              </button>
            </>
          )}
          <Link
            to="/jobs"
            className="text-gray-700 hover:text-applypilot-blue transition-colors dark:text-gray-300 dark:hover:text-applypilot-blue"
          >
            Jobs
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-applypilot-teal"
            />
            <span className="sr-only">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </span>
          </div>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-applypilot-teal">
                    <span className="w-8 h-8 rounded-full bg-applypilot-teal/10 flex items-center justify-center text-applypilot-teal mr-2">
                      {user.email?.[0].toUpperCase()}
                    </span>
                    <span className="hidden sm:inline">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                className="border-applypilot-teal text-applypilot-teal hover:bg-applypilot-teal/10"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-applypilot-teal to-applypilot-green border-0"
              >
                <Link to="/profile">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}