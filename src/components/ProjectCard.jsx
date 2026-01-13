import './ProjectCard.css';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
        <div className="project-thumbnail">
          <img src={project.thumbnail} alt={project.title} />
          <div className="project-overlay">
            <span className="view-project">View Project →</span>
          </div>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProjectCard;
