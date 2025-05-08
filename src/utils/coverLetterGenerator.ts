import { JobListing, UserProfile } from "@/types";

// In a real application, this would make an API call to OpenAI or another service
export async function generateCoverLetter(
  profile: UserProfile,
  job: JobListing
): Promise<string> {
  // This is a placeholder implementation for the MVP
  // In a real application, this would use the profile and CV data to generate a personalized cover letter
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `Dear Hiring Manager at ${job.company},

I am writing to express my interest in the ${job.title} position at ${job.company}. With my background in ${profile.profession} and relevant skills, I believe I would be a valuable addition to your team.

Based on the job description, I understand you're looking for someone with experience in ${job.requirements[0].replace(/\d\+\s/, '')} and ${job.requirements[1].replace(/\d\+\s/, '')}. Throughout my career, I have developed expertise in these areas and am excited about the opportunity to bring my skills to ${job.company}.

The ${job.salary} salary range aligns with my expectations of ${profile.salary}, and I am ${profile.location.toLowerCase().includes('remote') ? 'comfortable working remotely' : 'excited about the location in ' + profile.location}.

I am particularly drawn to this position because of the opportunity to work on ${job.description.split('.')[0].toLowerCase().replace("we're looking for", "")}.

Thank you for considering my application. I look forward to the possibility of discussing how my background, skills, and experiences would be a good match for this position.

Sincerely,
[Your Name]`;
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => resolve(event.target?.result as string);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });
}
