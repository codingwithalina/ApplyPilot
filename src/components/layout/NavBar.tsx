import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-applypilot-dark border-b border-gray-800 dark:bg-gray-900 dark:border-gray-700">
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
            className="text-gray-300 hover:text-applypilot-teal transition-colors dark:text-gray-300 dark:hover:text-applypilot-teal"
          >
            Home
          </Link>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-gray-300 hover:text-applypilot-green transition-colors dark:text-gray-300 dark:hover:text-applypilot-green"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-gray-300 hover:text-applypilot-blue transition-colors dark:text-gray-300 dark:hover:text-applypilot-blue"
          >
            Pricing
          </button>
          <Link
            to="/profile"
            className="text-gray-300 hover:text-applypilot-green transition-colors dark:text-gray-300 dark:hover:text-applypilot-green"
          >
            Profile
          </Link>
          <Link
            to="/jobs"
            className="text-gray-300 hover:text-applypilot-blue transition-colors dark:text-gray-300 dark:hover:text-applypilot-blue"
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
  {theme === "dark" ? "Dark mode an" : "Light mode an"}
</span>

          </div>
          <Button
            asChild
            variant="outline"
            className="border-applypilot-teal text-applypilot-teal hover:bg-applypilot-teal/10 dark:border-applypilot-teal dark:text-applypilot-teal dark:hover:bg-applypilot-teal/10"
          >
            <Link to="/profile">Create Profile</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
