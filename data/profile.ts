import { siteConfig } from './config';

export const profileData = {
  name: "Sadman Yasar Sayem",
  profile: "https://avatars.githubusercontent.com/u/67522140?v=4",
  favicon: "/favicon.ico",
  title: "Software Engineer",
  tagline: "I build things for the web.",
  bio: `I'm a Software Engineer based in Malaysia, working remotely for a Singaporean company. 
I specialize in building exceptional digital experiences with modern web technologies. 
My passion lies in creating performant, accessible, and visually stunning applications.`,
  email: siteConfig.email,
  urls: [
    {
      iconPath: "/upwork.svg",
      url: "https://www.upwork.com/freelancers/~01cfd344d945d1f282?viewMode=1",
      alt: "Click to visit my Upwork profile",
      name: "Upwork",
    },
    {
      iconPath: "/linkedin.svg",
      url: "https://www.linkedin.com/in/Sadman-Yasar-Sayem/",
      alt: "Click to visit my LinkedIn profile",
      name: "LinkedIn",
    },
    {
      iconPath: "/github.svg",
      url: "https://github.com/SadmanYasar",
      alt: "Click to visit my Github profile",
      name: "GitHub",
    },
    {
      iconPath: "/x.svg",
      url: "https://x.com/sadmanyasar_",
      alt: "Click to visit my X profile",
      name: "X",
    },
    {
      iconPath: "/behance.svg",
      url: "https://www.behance.net/sadmanyasar",
      alt: "Click to visit my Behance profile",
      name: "Behance",
    },
  ],
  experience: [
    {
      company: "Singaporean Tech Company",
      role: "Software Developer Executive",
      period: "2023 - Present",
      description:
        "Building scalable web applications with Next.js, React, and TypeScript. Leading frontend architecture decisions and mentoring junior developers.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GraphQL",
      ],
    },
    {
      company: "Tech Startup",
      role: "Frontend Developer",
      period: "2021 - 2023",
      description:
        "Built the core product from scratch, implementing responsive designs and optimizing performance. Collaborated closely with designers and backend engineers.",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "AWS"],
    },
    {
      company: "Freelance",
      role: "Full Stack Developer",
      period: "2020 - 2021",
      description:
        "Delivered custom web solutions for clients ranging from startups to established businesses. Focused on e-commerce and portfolio websites.",
      technologies: ["React", "Next.js", "WordPress", "Shopify", "Firebase"],
    },
  ],
  techStack: [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "JavaScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "Three.js", category: "3D" },
    { name: "GraphQL", category: "API" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
    { name: "Git", category: "Tools" },
    { name: "Figma", category: "Design" },
  ],
};
