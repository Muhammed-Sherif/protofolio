import './Hero.css';

function Hero({ hero }) {
  const {
    title = 'Full-Stack Developer',
    subtitle = 'Crafting exceptional web experiences with PHP Laravel & React',
    description =
      "I deliver high-quality, scalable solutions that combine powerful backend architecture with stunning, responsive frontends. Let's bring your vision to life.",
    imageUrl = '/profile.jpg',
    ctaPrimaryText = 'View My Work',
    ctaPrimaryUrl = '#projects',
    ctaSecondaryText = 'Get In Touch',
    ctaSecondaryUrl = '#contact'
  } = hero || {};

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-profile">
          <div className="profile-image-container">
              <img src={imageUrl} alt="Profile" className="profile-image" />
          </div>
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="hero-subtitle">{subtitle}</p>
        <p className="hero-description">{description}</p>
        <div className="hero-cta">
          <a href={ctaPrimaryUrl} className="btn btn-primary">
            {ctaPrimaryText}
          </a>
          <a href={ctaSecondaryUrl} className="btn btn-secondary">
            {ctaSecondaryText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
