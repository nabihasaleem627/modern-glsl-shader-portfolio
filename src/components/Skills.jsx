// Skills.jsx
// Technology skill grid with subtle hover glow cards.

const SKILLS = [
  { name: 'HTML',              icon: '🌐', level: 'Expert'       },
  { name: 'CSS',               icon: '🎨', level: 'Expert'       },
  { name: 'JavaScript',        icon: '⚡', level: 'Advanced'     },
  { name: 'React',             icon: '⚛️',  level: 'Advanced'     },
  { name: 'Node.js',           icon: '🟢', level: 'Intermediate' },
  { name: 'Express.js',        icon: '🚂', level: 'Intermediate' },
  { name: 'MongoDB',           icon: '🍃', level: 'Intermediate' },
  { name: 'MySQL',             icon: '🐬', level: 'Intermediate' },
  { name: 'PHP',               icon: '🐘', level: 'Familiar'     },
  { name: 'Git',               icon: '🌿', level: 'Advanced'     },
  { name: 'GitHub',            icon: '🐙', level: 'Advanced'     },
  { name: 'Responsive Design', icon: '📱', level: 'Expert'       },
];

const LEVEL_COLORS = {
  Expert:       'skill-badge-expert',
  Advanced:     'skill-badge-advanced',
  Intermediate: 'skill-badge-intermediate',
  Familiar:     'skill-badge-familiar',
};

export default function Skills() {
  return (
    <section id="skills" className="section section-alt" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What I Work With</p>
          <h2 id="skills-heading" className="section-title">Skills &amp; Technologies</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">
            A toolkit built through hands-on projects and continuous learning.
          </p>
        </div>

        <ul className="skills-grid reveal" role="list" aria-label="Skills list">
          {SKILLS.map(({ name, icon, level }) => (
            <li key={name}>
              <article className="skill-card glass-card" aria-label={`${name} — ${level}`}>
                <span className="skill-icon" aria-hidden="true">{icon}</span>
                <h3 className="skill-name">{name}</h3>
                <span className={`skill-badge ${LEVEL_COLORS[level]}`}>
                  {level}
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
