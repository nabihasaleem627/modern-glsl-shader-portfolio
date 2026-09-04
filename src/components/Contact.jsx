// Contact.jsx
// Contact section with social links and a static contact form UI.
// The form is front-end only — wire to a backend / email service as needed.

import { useState } from 'react';

const SOCIAL_LINKS = [
  {
    label: 'Email',
    href: 'mailto:nabihasaleem@example.com',
    description: 'nabihasaleem@example.com',
    icon: <EmailIcon />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nabihasaleem',
    description: 'linkedin.com/in/nabihasaleem',
    icon: <LinkedInIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/nabihasaleem',
    description: 'github.com/nabihasaleem',
    icon: <GithubIcon />,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'Name is required.';
    if (!formData.email.trim())   e.email   = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
                                  e.email   = 'Please enter a valid email.';
    if (!formData.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: send formData to an email service (e.g. Formspree, EmailJS, custom API)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Get In Touch</p>
          <h2 id="contact-heading" className="section-title">Contact Me</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">
            Have a project in mind or want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* ── Social / info column ─────────────────────── */}
          <div className="contact-info">
            <p className="contact-intro">
              I'm currently open to internships, freelance opportunities, and
              collaborative projects. Whether it's a quick question or a big
              idea — reach out.
            </p>

            <ul className="contact-links" role="list">
              {SOCIAL_LINKS.map(({ label, href, description, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="contact-link glass-card"
                    aria-label={`${label}: ${description}`}
                  >
                    <span className="contact-link-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <div>
                      <p className="contact-link-label">{label}</p>
                      <p className="contact-link-desc">{description}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact form ─────────────────────────────── */}
          <div className="contact-form-wrapper glass-card">
            {submitted ? (
              <div className="contact-success" role="status" aria-live="polite">
                <span className="contact-success-icon" aria-hidden="true">✓</span>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="contact-form"
              >
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" className="form-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="form-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <p id="message-error" className="form-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button type="submit" className="btn-primary btn-full">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer credit */}
        <div className="site-footer" role="contentinfo">
          <p>Designed &amp; built by <strong>Nabiha Saleem</strong> · {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Icons ────────────────────────────────────────────────────
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}
