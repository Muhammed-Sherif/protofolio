import ProjectCard from './ProjectCard';
import './Projects.css';

function Projects({ projects = [], section }) {
  const title = section?.title || 'Featured Projects';
  const subtitle =
    section?.subtitle ||
    'Showcasing high-quality solutions that deliver exceptional results';

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id ?? project.title ?? index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
