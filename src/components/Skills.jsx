import './Skills.css';

function Skills() {
  const skillCategories = [
    {
      title: "Backend Development",
      skills: ["PHP", "Laravel", "MySQL", "PostgreSQL", "REST APIs", "Authentication"]
    },
    {
      title: "Frontend Development",
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Responsive Design", "Vite"]
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "Redis", "Webpack", "npm", "Composer"]
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">
            Technologies I use to build exceptional web applications
          </p>
        </div>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-item">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
