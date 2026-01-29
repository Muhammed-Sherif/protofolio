import './About.css';

function About({ about }) {
  if (!about) {
    return null;
  }

  const { title, subtitle, body, highlights = [] } = about;

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </div>
        <div className="about-content">
          <p className="about-body">{body}</p>
          {highlights.length > 0 ? (
            <ul className="about-highlights">
              {highlights.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default About;
