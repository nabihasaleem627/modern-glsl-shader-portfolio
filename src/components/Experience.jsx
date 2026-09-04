// Experience.jsx
// Professional timeline — internships and practical development experience.
// Content is intentionally kept factual and easy to replace.

const EXPERIENCE = [
  {
    id: 'exp-1',
    role: 'Full Stack Development Intern',
    company: 'Tech Company Name',
    period: '2024 — Present',
    type: 'Internship',
    bullets: [
      'Built and maintained full-stack web features using React on the frontend and Node.js / Express on the backend.',
      'Designed and optimised MySQL database schemas for data-heavy administrative modules.',
      'Collaborated in an agile team — participated in sprint planning, code reviews, and daily standups.',
      'Improved frontend performance by reducing bundle size and implementing lazy loading.',
    ],
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer (Freelance)',
    company: 'Independent Projects',
    period: '2023 — 2024',
    type: 'Freelance',
    bullets: [
      'Developed responsive websites and landing pages for small businesses and individuals.',
      'Focused on accessibility, clean code, and cross-browser compatibility.',
      'Delivered projects end-to-end — from client brief to deployment.',
    ],
  },
  {
    id: 'exp-3',
    role: 'Personal Projects & Open Source',
    company: 'Self-Directed Learning',
    period: '2022 — Present',
    type: 'Self-Directed',
    bullets: [
      'Built a range of full-stack projects covering authentication, CRUD APIs, RBAC, and interactive UIs.',
      'Contributed to understanding modern web patterns through continuous hands-on experimentation.',
      'Documented projects and maintained a public GitHub portfolio.',
    ],
  },
];

const TYPE_COLORS = {
  Internship:    'exp-badge-internship',
  Freelance:     'exp-badge-freelance',
  'Self-Directed': 'exp-badge-self',
};

export default function Experience() {
  return (
    <section id="experience" className="section section-alt" aria-labelledby="exp-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">My Journey</p>
          <h2 id="exp-heading" className="section-title">Experience</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">
            Practical development experience across internships, freelance
            work, and self-directed projects.
          </p>
        </div>

        {/* Timeline */}
        <ol className="timeline reveal" aria-label="Experience timeline">
          {EXPERIENCE.map((item, index) => (
            <li key={item.id} className="timeline-item">
              {/* Connector line & node */}
              <div className="timeline-connector" aria-hidden="true">
                <div className="timeline-node" />
                {index < EXPERIENCE.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>

              {/* Card */}
              <article
                className="exp-card glass-card"
                aria-labelledby={`${item.id}-role`}
              >
                <div className="exp-card-header">
                  <div className="exp-card-meta">
                    <h3 id={`${item.id}-role`} className="exp-role">
                      {item.role}
                    </h3>
                    <p className="exp-company">{item.company}</p>
                  </div>
                  <div className="exp-right">
                    <span className="exp-period">{item.period}</span>
                    <span className={`exp-type-badge ${TYPE_COLORS[item.type]}`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                <ul className="exp-bullets" aria-label="Responsibilities and achievements">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="exp-bullet">
                      <span className="exp-bullet-dot" aria-hidden="true">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
