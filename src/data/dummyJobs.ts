import { JobListing } from "@/types";

export const dummyJobs: JobListing[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote Available)",
    salary: "$90,000 - $120,000",
    description: "We're looking for a Frontend Developer to join our growing team. You'll be responsible for building user interfaces, implementing responsive designs, and collaborating with our backend team.",
    requirements: [
      "3+ years experience with React.js",
      "Strong JavaScript fundamentals",
      "Experience with CSS frameworks like Tailwind",
      "Understanding of REST APIs and state management",
      "Bachelor's degree in Computer Science or related field (or equivalent experience)"
    ],
    posted: "2023-04-15"
  },
  {
    id: "job-2",
    title: "Full Stack Engineer",
    company: "Innovate Solutions",
    location: "Remote",
    salary: "$110,000 - $140,000",
    description: "Join our engineering team to build scalable web applications. You'll work across the entire stack, from database design to frontend implementation.",
    requirements: [
      "4+ years of full-stack development experience",
      "Proficiency in Node.js and React",
      "Experience with databases (SQL and NoSQL)",
      "Understanding of cloud infrastructure (AWS/Azure/GCP)",
      "Excellent problem-solving skills"
    ],
    posted: "2023-04-20"
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "Creative Labs",
    location: "New York, NY (Hybrid)",
    salary: "$85,000 - $115,000",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our digital products. You'll work closely with product managers and developers to bring designs to life.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Adobe XD)",
      "Understanding of design systems and component libraries",
      "Experience with user research and testing",
      "Strong portfolio demonstrating your design process"
    ],
    posted: "2023-04-18"
  },
  {
    id: "job-4",
    title: "Product Manager",
    company: "ProductHub",
    location: "Austin, TX (On-site)",
    salary: "$100,000 - $130,000",
    description: "Lead the development of our flagship product from conception to launch. You'll define product strategy, gather requirements, and work with cross-functional teams to deliver exceptional user experiences.",
    requirements: [
      "5+ years of product management experience",
      "Strong understanding of software development lifecycle",
      "Experience with agile methodologies",
      "Excellent communication and leadership skills",
      "Bachelor's degree in a related field"
    ],
    posted: "2023-04-22"
  },
  {
    id: "job-5",
    title: "Data Scientist",
    company: "DataInsight",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description: "Join our data science team to extract insights from complex datasets. You'll build predictive models, conduct statistical analyses, and communicate findings to stakeholders.",
    requirements: [
      "4+ years of experience in data science or related field",
      "Proficiency in Python and data science libraries",
      "Experience with machine learning and statistical modeling",
      "Strong problem-solving and analytical skills",
      "Master's or PhD in a quantitative field preferred"
    ],
    posted: "2023-04-25"
  }
];
