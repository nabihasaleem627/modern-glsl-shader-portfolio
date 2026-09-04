// App.jsx
// Root component — assembles all sections and detects reduced-motion preference.
// Also wires up a lightweight IntersectionObserver for section reveal animations.

import { useEffect, useState } from 'react';
import Navbar      from './components/Navbar';
import ShaderHero  from './components/ShaderHero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Experience  from './components/Experience';
import Contact     from './components/Contact';

export default function App() {
  // Detect OS-level reduced-motion preference for accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lightweight reveal-on-scroll using IntersectionObserver
  useEffect(() => {
    if (prefersReducedMotion) return;

    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <ShaderHero prefersReducedMotion={prefersReducedMotion} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
