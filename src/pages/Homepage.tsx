import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LottieAnimation from "@/components/common/LottieAnimation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageSection } from "@/components/common/ImageSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Gem } from "lucide-react";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/jobs?search=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Craft Your Career Path with{" "}
            <span className="bg-gradient-to-r from-applypilot-teal via-applypilot-green to-applypilot-blue bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Applications
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ApplyPilot helps you find the perfect job and create personalized
            cover letters using AI to increase your chances of landing your
            dream job.
          </p>

          <LottieAnimation />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              asChild
              size="lg"
              className="px-8 bg-gradient-to-r from-applypilot-teal to-applypilot-green border-0"
            >
              <Link to="/profile">Create Profile</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 border-applypilot-blue text-applypilot-blue hover:bg-applypilot-blue/10"
            >
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-card border-applypilot-teal/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-applypilot-teal/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-applypilot-teal"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-applypilot-teal">
                  Create Your Profile
                </h3>
                <p className="text-muted-foreground">
                  Build your profile with your desired field, salary
                  expectations, and location preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-applypilot-green/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-applypilot-green/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-applypilot-green"
                  >
                    <rect
                      x="2"
                      y="7"
                      width="20"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-applypilot-green">
                  Discover Jobs
                </h3>
                <p className="text-muted-foreground">
                  Browse through job listings that match your skills and
                  preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-applypilot-blue/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-applypilot-blue/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-applypilot-blue"
                  >
                    <path d="M21 7v6h-6"></path>
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3.7-3.7"></path>
                    <path d="M3 7h6"></path>
                    <path d="M21 17a9 9 0 0 1-9 9 9 9 0 0 1-6-2.3L2.3 17.7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-applypilot-blue">
                  Generate Cover Letters
                </h3>
                <p className="text-muted-foreground">
                  Use AI to create personalized cover letters that highlight
                  your strengths for each job.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform simplifies the job application process from
            start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-applypilot-teal/10 flex items-center justify-center">
                <span className="font-medium text-applypilot-teal">1</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-applypilot-teal">
                  Create Your Profile
                </h3>
                <p className="text-muted-foreground">
                  Fill in your desired profession, salary expectations, and
                  location preferences. Upload your resume to help our AI
                  understand your qualifications.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-applypilot-green/10 flex items-center justify-center">
                <span className="font-medium text-applypilot-green">2</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-applypilot-green">
                  Browse Job Listings
                </h3>
                <p className="text-muted-foreground">
                  Explore job opportunities that match your profile. Review
                  details including job descriptions, requirements, and salary
                  ranges.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-applypilot-blue/10 flex items-center justify-center">
                <span className="font-medium text-applypilot-blue">3</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-applypilot-blue">
                  Generate Cover Letter
                </h3>
                <p className="text-muted-foreground">
                  With one click, our AI creates a customized cover letter
                  tailored to the specific job and your resume. Edit the content
                  as needed.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-applypilot-teal via-applypilot-green to-applypilot-blue/10 flex items-center justify-center">
                <span className="font-medium text-applypilot-blue">4</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-applypilot-blue">
                  Submit Your Application
                </h3>
                <p className="text-muted-foreground">
                  Review your application and submit it with confidence, knowing
                  your cover letter is personalized for the position.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Start Your Journey Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your profile and let ApplyPilot help you find your next
            career opportunity.
          </p>

          <div className="max-w-lg mx-auto mb-8">
            <ImageSection
              imagePath="https://cdn.jsdelivr.net/gh/codingwithalina/ApplyPilot-with-bolt.diy@main/public/images/application.jpg"
              altText="Stack of accepted applications"
              caption="Join thousands of successful job seekers"
              height="h-64"
            />
          </div>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-applypilot-teal via-applypilot-green to-applypilot-blue border-0"
          >
            <Link to="/profile">Get Started</Link>
          </Button>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from professionals who found their dream jobs with ApplyPilot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-applypilot-teal/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-applypilot-teal to-applypilot-green flex items-center justify-center text-background font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">James Donovan</h4>
                    <p className="text-sm text-muted-foreground">
                      Software Engineer
                    </p>
                  </div>
                  <div className="flex text-applypilot-teal mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The AI-generated cover letter was spot-on! It highlighted
                    my skills perfectly and I got called for an interview within
                    days."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-applypilot-green/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-applypilot-green to-applypilot-blue flex items-center justify-center text-background font-bold text-xl">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Marketing Director
                    </p>
                  </div>
                  <div className="flex text-applypilot-green mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <p className="text-muted-foreground italic">
                    "I've tried several job application tools, but ApplyPilot's
                    personalized approach is truly game-changing. Within a
                    month, I landed my dream marketing position!"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-applypilot-blue/20">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-applypilot-blue to-applypilot-teal flex items-center justify-center text-background font-bold text-xl">
                    RK
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Robert Kim</h4>
                    <p className="text-sm text-muted-foreground">
                      Data Scientist
                    </p>
                  </div>
                  <div className="flex text-applypilot-blue mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="mr-1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <p className="text-muted-foreground italic">
                    "The premium templates and AI-generated cover letters helped
                    me stand out in a competitive field. Worth every penny of
                    the subscription!"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer flexible pricing plans to suit your needs. Whether you're
              just starting or ready to take your job applications to the next
              level, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Basic Plan */}
            <Card className="border-applypilot-teal/20 relative">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-applypilot-teal to-applypilot-teal/50 rounded-t-lg"></div>
              <CardContent className="pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    Ideal for those just getting started.
                  </p>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-4xl font-bold">Free</span>
                    <span className="text-muted-foreground ml-1">Forever</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-applypilot-teal mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>1 Application</strong> per month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-teal mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Access to basic job search features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-teal mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Limited cover letter generation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-teal mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Email notifications for new job listings</span>
                  </li>
                </ul>

                <Button
                  asChild
                  className="w-full bg-applypilot-teal hover:bg-applypilot-teal/90"
                >
                  <Link to="/profile">Sign Up Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan - Highlighted */}
            <Card className="border-applypilot-green relative shadow-xl transform scale-105 z-10 bg-gradient-to-b from-card to-card/95">
              <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-applypilot-green via-applypilot-blue to-applypilot-green rounded-t-lg"></div>
              <Badge className="absolute top-0 right-4 -translate-y-1/2 bg-gradient-to-r from-applypilot-green to-applypilot-blue text-white font-medium px-3 py-1">
                <Gem className="w-4 h-4 mr-1" /> Best Value
              </Badge>
              <CardContent className="pt-10 pb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-applypilot-green">
                    Premium Plan
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Perfect for professionals who want to maximize their job
                    search efforts.
                  </p>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-4xl font-bold text-applypilot-green">
                      $14.99
                    </span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Unlimited applications</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Full access to cover letter generation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Priority job listing notifications</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Exclusive premium templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Career advice & tips via AI</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-green mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Smart job-matching algorithms</span>
                  </li>
                </ul>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-applypilot-green to-applypilot-blue hover:opacity-90 text-white font-medium shadow-md"
                >
                  <Link to="/profile">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-applypilot-blue/20 relative">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-applypilot-blue to-applypilot-blue/50 rounded-t-lg"></div>
              <Badge className="absolute top-0 right-4 -translate-y-1/2 bg-applypilot-blue">
                For Serious Job Seekers
              </Badge>
              <CardContent className="pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    For those who want the ultimate edge in their job search.
                  </p>
                  <div className="flex justify-center items-baseline mb-4">
                    <span className="text-4xl font-bold">$29.99</span>
                    <span className="text-muted-foreground ml-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="text-applypilot-blue mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Everything in Premium Plan</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-blue mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>AI-driven resume improvement</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-blue mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct application submission</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-blue mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>
                      <strong>Dedicated support</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-applypilot-blue mr-2 h-5 w-5 shrink-0 mt-0.5" />
                    <span>Personalized coaching (optional add-on)</span>
                  </li>
                </ul>

                <Button
                  asChild
                  className="w-full bg-applypilot-blue hover:bg-applypilot-blue/90"
                >
                  <Link to="/profile">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Add-ons Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Additional Add-ons
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-applypilot-teal/20">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">
                      Personalized Resume Review
                    </h4>
                    <span className="font-bold text-lg">$39.99</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Get expert feedback on your resume from our professional
                    career advisors.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-applypilot-teal text-applypilot-teal hover:bg-applypilot-teal/10"
                  >
                    <Link to="/profile">Add to Your Plan</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-applypilot-green/20">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">
                      Career Coaching Session
                    </h4>
                    <span className="font-bold text-lg">$59.99</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    One-on-one coaching session to help you navigate your career
                    path and job search.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-applypilot-green text-applypilot-green hover:bg-applypilot-green/10"
                  >
                    <Link to="/profile">Add to Your Plan</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-center">FAQ</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-left font-medium">
                  What's included in the free plan?
                </AccordionTrigger>
                <AccordionContent>
                  The free plan allows you to send up to 1 application per
                  month, access job listings, and generate basic cover letters.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger className="text-left font-medium">
                  How can I upgrade my plan?
                </AccordionTrigger>
                <AccordionContent>
                  Simply click on the "Upgrade" button in your profile to switch
                  to a plan that suits your needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger className="text-left font-medium">
                  Can I cancel my subscription anytime?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, all plans are month-to-month with no long-term
                  commitment. You can cancel your subscription at any time.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Plan Comparison Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Compare All Plans
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Free Plan</TableHead>
                    <TableHead>Premium Plan</TableHead>
                    <TableHead>Pro Plan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Applications per month
                    </TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Cover Letter Generation
                    </TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>Full Access</TableCell>
                    <TableCell>Full Access</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Premium Templates
                    </TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Direct Application Submission
                    </TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Personalized Resume Review
                    </TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Career Coaching
                    </TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Yes (Add-on)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    <TableCell>$0</TableCell>
                    <TableCell>$14.99/month</TableCell>
                    <TableCell>$29.99/month</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Job Search Section */}
        <div className="bg-gradient-to-r from-applypilot-teal/10 to-applypilot-blue/10 rounded-xl p-8 mb-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Find Your Next Opportunity
            </h3>
            <p className="text-muted-foreground">
              Search through thousands of jobs that match your skills and
              preferences
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Search by job title, company, or keyword"
                className="flex-grow bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-applypilot-teal to-applypilot-green border-0"
              >
                Search Jobs
              </Button>
            </div>

            <div className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="popular-searches">
                  <AccordionTrigger className="text-sm text-muted-foreground">
                    Popular searches
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/jobs?search=Software%20Engineer">
                          Software Engineer
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/jobs?search=Product%20Manager">
                          Product Manager
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/jobs?search=Data%20Scientist">
                          Data Scientist
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/jobs?search=Marketing">Marketing</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/jobs?search=Remote">Remote</Link>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
