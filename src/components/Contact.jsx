import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

function Contact({ contact }) {
  const {
    title = "Let's Work Together",
    subtitle =
      "Ready to start your next project? Get in touch and let's create something amazing.",
    email = 'hello@example.com',
    githubUrl,
    githubLabel,
    linkedinUrl,
    linkedinLabel,
    whatsappNumber,
    whatsappUrl,
    benefits = []
  } = contact || {};

  const resolvedGithubUrl = githubUrl || 'https://github.com/';
  const resolvedGithubLabel =
    githubLabel || resolvedGithubUrl.replace('https://', '');
  const resolvedLinkedinUrl = linkedinUrl || 'https://linkedin.com/';
  const resolvedLinkedinLabel =
    linkedinLabel || resolvedLinkedinUrl.replace('https://', '');
  const resolvedWhatsappUrl =
    whatsappUrl ||
    (whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : '');

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon"><FaEnvelope /></div>
              <div className="info-text">
                <h3>Email</h3>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaGithub /></div>
              <div className="info-text">
                <h3>GitHub</h3>
                <a
                  href={resolvedGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resolvedGithubLabel}
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaLinkedin /></div>
              <div className="info-text">
                <h3>LinkedIn</h3>
                <a
                  href={resolvedLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resolvedLinkedinLabel}
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><FaWhatsapp /></div>
              <div className="info-text">
                <h3>WhatsApp</h3>
                {resolvedWhatsappUrl ? (
                  <a
                    href={resolvedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {whatsappNumber || resolvedWhatsappUrl}
                  </a>
                ) : (
                  <span>{whatsappNumber || 'Add a WhatsApp number'}</span>
                )}
              </div>
            </div>
          </div>
          <div className="cta-box">
            <h3>Why Work With Me?</h3>
            <ul className="benefits-list">
              {benefits.length > 0 ? (
                benefits.map((benefit, index) => (
                  <li key={`${benefit}-${index}`}>{benefit}</li>
                ))
              ) : (
                <li>Tell clients why working with you is valuable.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
