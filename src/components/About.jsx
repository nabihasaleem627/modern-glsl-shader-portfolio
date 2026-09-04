// About.jsx
// Professional introduction section.

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Who I Am</p>
          <h2 id="about-heading" className="section-title">About Me</h2>
          <div className="section-divider" aria-hidden="true" />
        </div>

        <div className="about-grid reveal">
          {/* Text block */}
          <div className="about-text">
            <p className="about-lead">
              I'm <strong>Nabiha Saleem</strong>, a passionate Full Stack Web
              Developer who loves turning ideas into polished, performant web
              applications that people actually enjoy using.
            </p>
            <p>
              My work sits at the intersection of thoughtful engineering and
              clean design. I focus on writing maintainable, accessible code
              and building experiences that work seamlessly across every
              device — from mobile phones to wide-screen desktops.
            </p>
            <p>
              On the frontend I craft interactive UIs with React, and on the
              backend I build reliable REST APIs with Node.js and Express. I'm
              comfortable with both SQL (MySQL) and NoSQL (MongoDB) databases,
              and I enjoy the full journey from database schema design to
              pixel-perfect UI.
            </p>
            <p>
              I believe great software is empathetic — it anticipates user
              needs, communicates clearly, and never gets in the way. That
              philosophy guides every line of code I write.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="about-cards">
            {[
              {
                icon: '⚡',
                label: 'Frontend Engineering',
                desc: 'Responsive, accessible React applications with a focus on UX.',
              },
              {
                icon: '🔧',
                label: 'Backend Development',
                desc: 'RESTful APIs, server logic, and database design with Node.js.',
              },
              {
                icon: '🧩',
                label: 'Problem Solving',
                desc: 'Breaking down complex challenges into clean, scalable solutions.',
              },
              {
                icon: '🚀',
                label: 'Practical Delivery',
                desc: 'Shipping real, working products — not just prototypes.',
              },
            ].map(({ icon, label, desc }) => (
              <article key={label} className="about-card glass-card">
                <span className="about-card-icon" aria-hidden="true">{icon}</span>
                <h3 className="about-card-label">{label}</h3>
                <p className="about-card-desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
