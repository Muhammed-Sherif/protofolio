import { useState } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

function Projects() {
  // Sample projects - Replace with your actual projects
  const [projects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-featured online store built with Laravel backend and React frontend. Features include cart management, payment integration, and admin dashboard.",
      thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project1",
      tags: ["Laravel", "React", "MySQL", "Stripe"]
    },
    {
      id: 2,
      title: "Task Management System",
      description: "Collaborative task management application with real-time updates. Built with Laravel API and React SPA for seamless user experience.",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project2",
      tags: ["Laravel", "React", "WebSocket", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media metrics with beautiful data visualizations and real-time updates.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project3",
      tags: ["React", "Chart.js", "REST API"]
    },
    {
      id: 4,
      title: "Blog CMS",
      description: "Modern content management system with markdown support, SEO optimization, and multi-user capabilities.",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project4",
      tags: ["Laravel", "React", "Markdown", "Redis"]
    },
    {
      id: 5,
      title: "Real Estate Portal",
      description: "Property listing platform with advanced search filters, interactive maps, and booking system.",
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project5",
      tags: ["Laravel", "React", "Maps API", "MySQL"]
    },
    {
      id: 6,
      title: "Restaurant Ordering App",
      description: "Online food ordering system with menu management, order tracking, and delivery integration.",
      thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      link: "https://github.com/yourusername/project6",
      tags: ["Laravel", "React", "Payment Gateway"]
    }
  ]);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Showcasing high-quality solutions that deliver exceptional results
          </p>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
