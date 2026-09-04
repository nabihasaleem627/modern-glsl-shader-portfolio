// Projects.jsx
// Portfolio project cards with tech tags and action links.

const PROJECTS = [
  {
    id: 'birthday',
    title: 'Full Stack Birthday Website',
    description:
      'A personalised, interactive birthday surprise website featuring animated countdowns, a digital card builder, a music player, and a guestbook — all persisted with a Node/MongoDB backend.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'CSS Animations'],
    github: 'https://github.com/nabihasaleem',
    live: null,
    highlight: true,
  },
  {
    id: 'ecommerce',
    title: 'Mini E-Commerce Website',
    description:
      'A fully-featured product catalogue and shopping cart application with user authentication, product filtering, and a checkout flow backed by a REST API and MySQL database.',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'JWT Auth'],
    github: 'https://github.com/nabihasaleem',
    live: null,
    highlight: false,
  },
  {
    id: 'dashboard',
    title: 'Admin Dashboard / RBAC System',
    description:
      'A secure role-based access control system with an admin dashboard, user management, permission matrices, and an audit log — built to demonstrate enterprise-level access control patterns.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'RBAC', 'JWT'],
    github: 'https://github.com/nabihasaleem',
    live: null,
    highlight: false,
  },
  {
    id: 'ai-writing',
    title: 'AI Content Writing Assistant',
    description:
      'A web application that integrates a large-language-model API to help writers generate, rewrite, and refine content. Includes prompt history, tone presets, and markdown export.',
    tech: ['React', 'Node.js', 'LLM API', 'Tailwind CSS', 'Markdown'],
    github: 'https://github.com/nabihasaleem',
    live: null,
    highlight: false,
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'This very website — a production-ready personal portfolio featuring a custom GLSL fragment shader hero, responsive design, accessibility support, and smooth scroll navigation.',
    tech: ['React', 'Vite', 'GLSL / WebGL', 'Tailwind CSS', 'CSS Animations'],
    github: 'https://github.com/nabihasaleem',
    live: null,
    highlight: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What I've Built</p>
          <h2 id="projects-heading" className="section-title">Projects</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">
            A selection of projects built to solve real problems and explore
            new technologies.
          </p>
        </div>

        <ul className="projects-grid reveal" role="list">
          {PROJECTS.map((project) => (
            <li key={project.id}>
              <article
                className={`project-card glass-card ${project.highlight ? 'project-card-highlight' : ''}`}
                aria-labelledby={`proj-title-${project.id}`}
              >
                {project.highlight && (
                  <div className="project-featured-badge" aria-label="Featured project">
                    ✦ Featured
                  </div>
                )}

                <h3 id={`proj-title-${project.id}`} className="project-title">
                  {project.title}
                </h3>

                <p className="project-description">{project.description}</p>

                {/* Tech stack tags */}
                <ul className="project-tech-list" role="list" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <li key={t} className="project-tech-tag">{t}</li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="project-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn project-btn-ghost"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <GithubIcon />
                    GitHub
                  </a>

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-primary"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalIcon />
                      Live Demo
                    </a>
                  ) : (
                    <span className="project-btn project-btn-disabled" aria-label="Live demo coming soon">
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Inline SVG icons ────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
