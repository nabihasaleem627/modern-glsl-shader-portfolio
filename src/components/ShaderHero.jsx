// ShaderHero.jsx
// Fullscreen WebGL canvas that renders the aurora.frag shader,
// with performance optimisations, accessibility fallback, and
// mouse interactivity.

import { useEffect, useRef, useCallback } from 'react';
import auroraFrag from '../shaders/aurora.frag?raw';

// ─── Vertex shader ───────────────────────────────────────────
// Minimal passthrough: draws a full-screen quad and passes
// gl_FragCoord to the fragment shader. No transforms needed.
const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// ─── Helper: compile a single shader stage ───────────────────
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// ─── Helper: link a full shader program ─────────────────────
function createProgram(gl, vertSrc, fragSrc) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// ─── Full-screen quad geometry ───────────────────────────────
// Two triangles covering clip-space [-1, 1] on both axes.
const QUAD_VERTS = new Float32Array([
  -1, -1,
   1, -1,
  -1,  1,
  -1,  1,
   1, -1,
   1,  1,
]);

export default function ShaderHero({ prefersReducedMotion }) {
  const canvasRef    = useRef(null);
  const glStateRef   = useRef(null); // holds all WebGL objects
  const rafRef       = useRef(null); // requestAnimationFrame handle
  const startTimeRef = useRef(null); // epoch ms when animation began
  const mouseRef     = useRef({ x: 0.5, y: 0.5 }); // normalised mouse

  // ─── Scroll to section helper ──────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── Mouse / touch tracking ────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      // Invert Y so shader bottom = 0, top = 1 (matches UV convention)
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    };
  }, []);

  // ─── WebGL initialisation ─────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return; // use CSS fallback instead

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Request WebGL context; fall back gracefully if unavailable
    const gl = canvas.getContext('webgl', {
      alpha: false,            // opaque background — no compositing cost
      antialias: false,        // not needed for full-screen shader
      depth: false,            // no depth buffer needed
      stencil: false,
      powerPreference: 'default',
    });

    if (!gl) {
      // WebGL unavailable — the CSS fallback background will show
      console.warn('WebGL not available. Falling back to CSS gradient.');
      return;
    }

    // Compile and link the aurora shader program
    const program = createProgram(gl, VERTEX_SHADER, auroraFrag);
    if (!program) return;

    // Upload the quad geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTS, gl.STATIC_DRAW);

    // Wire up the position attribute
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations (avoid per-frame lookups)
    const uTime       = gl.getUniformLocation(program, 'u_time');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse      = gl.getUniformLocation(program, 'u_mouse');

    gl.useProgram(program);

    // Store everything for the render loop and cleanup
    glStateRef.current = { gl, program, buffer, posLoc, uTime, uResolution, uMouse };
    startTimeRef.current = performance.now();

    // ─── Resize canvas to fill viewport (capped DPR) ─────────
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // ─── Render loop ─────────────────────────────────────────
    const render = () => {
      const state = glStateRef.current;
      if (!state) return;

      const elapsed = (performance.now() - startTimeRef.current) / 1000; // seconds

      gl.uniform1f(state.uTime, elapsed);
      gl.uniform2f(state.uResolution, canvas.width, canvas.height);
      gl.uniform2f(state.uMouse, mouseRef.current.x, mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    // ─── Page Visibility API — pause when tab is hidden ──────
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        // Offset startTime so time uniform doesn't jump
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ─── Cleanup ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      glStateRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="Hero section"
    >
      {/* WebGL canvas — hidden if reduced-motion is preferred */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="hero-canvas"
          aria-hidden="true"
          onMouseMove={handleMouseMove}
        />
      )}

      {/* Static CSS gradient fallback (reduced-motion or no WebGL) */}
      <div
        className={`hero-gradient-fallback ${prefersReducedMotion ? 'visible' : ''}`}
        aria-hidden="true"
      />

      {/* Dark overlay to boost text contrast over the bright shader */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Decorative ambient orbs (pure CSS, no JS) */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      {/* ── Hero Content ──────────────────────────────────────── */}
      <div className="hero-content">
        {/* Eyebrow label */}
        <p className="hero-eyebrow">Hello, I'm</p>

        {/* Primary name heading */}
        <h1 className="hero-name">
          Nabiha<br />
          <span className="hero-name-accent">Saleem</span>
        </h1>

        {/* Role / title */}
        <p className="hero-role">Full Stack Web Developer</p>

        {/* Tagline */}
        <p className="hero-tagline">
          Building responsive, interactive, and user-focused web&nbsp;experiences
          with modern technologies.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta" role="group" aria-label="Call to action">
          <button
            className="btn-primary"
            onClick={() => scrollTo('projects')}
            aria-label="View my projects"
          >
            View Projects
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollTo('contact')}
            aria-label="Go to contact section"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-label="Scroll down">
        <span className="scroll-indicator-text">Scroll</span>
        <div className="scroll-indicator-line" aria-hidden="true">
          <div className="scroll-indicator-dot" />
        </div>
      </div>
    </section>
  );
}
