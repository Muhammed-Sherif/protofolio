import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Ready to start your next project? Get in touch and let's create something amazing.
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-text">
                <h3>Email</h3>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🌐</div>
              <div className="info-text">
                <h3>GitHub</h3>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  github.com/yourusername
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">💼</div>
              <div className="info-text">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/yourusername
                </a>
              </div>
            </div>
          </div>
          <div className="cta-box">
            <h3>Why Work With Me?</h3>
            <ul className="benefits-list">
              <li>✨ High-quality, scalable code</li>
              <li>🚀 Fast turnaround times</li>
              <li>💡 Creative problem solving</li>
              <li>📱 Responsive & modern design</li>
              <li>🔒 Security-focused development</li>
              <li>🤝 Clear communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
