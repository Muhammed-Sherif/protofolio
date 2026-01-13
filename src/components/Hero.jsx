import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-profile">
          <img src="/profile.jpg" alt="Profile" className="profile-image" />
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">Full-Stack Developer</span>
        </h1>
        <p className="hero-subtitle">
          Crafting exceptional web experiences with PHP Laravel & React
        </p>
        <p className="hero-description">
          I deliver high-quality, scalable solutions that combine powerful backend architecture 
          with stunning, responsive frontends. Let's bring your vision to life.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
