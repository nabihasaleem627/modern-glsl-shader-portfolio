// ============================================================
// aurora.frag — Custom GLSL Fragment Shader
// Visual signature for Nabiha Saleem's portfolio
// An atmospheric aurora/nebula flow field in purple & indigo
// ============================================================

precision highp float;

// --- Uniforms passed from JavaScript ---
uniform float u_time;        // Elapsed time in seconds (drives animation)
uniform vec2  u_resolution;  // Canvas width and height in pixels
uniform vec2  u_mouse;       // Normalized mouse position [0..1] on both axes

// ============================================================
// UTILITY: Smooth pseudo-random value from a 2D seed.
// Uses a dot-product trick with irrational constants to scatter
// inputs across [0, 1] in a way that looks random.
// ============================================================
float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
}

// ============================================================
// VALUE NOISE: Bilinear interpolation of hash values at the
// four corners of a unit cell. Smoothstep (iq's curve)
// eliminates grid artifacts for a natural, organic look.
// ============================================================
float noise(vec2 p) {
    vec2 i = floor(p);   // integer cell index
    vec2 f = fract(p);   // fractional position within cell

    // Four corner hash values
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    // Smoothstep easing — removes banding from linear interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    // Bilinear blend of the four corners
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// ============================================================
// FRACTAL BROWNIAN MOTION (fBm): Stacks multiple noise octaves
// at increasing frequency and decreasing amplitude.
// More octaves = more fine detail, but more GPU cost.
// 5 octaves gives a good balance for a nebula-like texture.
// ============================================================
float fbm(vec2 p) {
    float value     = 0.0;  // accumulated result
    float amplitude = 0.5;  // contribution of each octave
    float frequency = 1.0;  // scale of each octave

    for (int i = 0; i < 5; i++) {
        value     += amplitude * noise(p * frequency);
        frequency *= 2.1;   // slightly off-integer to avoid harmonic patterns
        amplitude *= 0.45;  // each octave contributes less
    }
    return value;
}

// ============================================================
// DOMAIN-WARPED fBm: Distorts the input coordinates using
// two independent fBm calls before the final fBm evaluation.
// This is Inigo Quilez's "domain warping" technique — it makes
// the flow field curl and fold organically like aurora bands.
// ============================================================
float warpedNoise(vec2 p, float t) {
    // First level of warp — a slow drift tied to time
    vec2 q = vec2(
        fbm(p + vec2(0.0,  0.0) + t * 0.06),
        fbm(p + vec2(5.2,  1.3) + t * 0.05)
    );

    // Second level of warp — finer curl using the warped q
    vec2 r = vec2(
        fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.04),
        fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.03)
    );

    // Final fBm evaluated on twice-warped coordinates
    return fbm(p + 4.0 * r);
}

// ============================================================
// MAIN: Entry point — runs once per fragment (pixel)
// ============================================================
void main() {

    // ----------------------------------------------------------
    // UV NORMALIZATION
    // gl_FragCoord gives pixel position in [0, resolution].
    // Dividing by resolution maps it to [0, 1] on each axis.
    // ----------------------------------------------------------
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // ----------------------------------------------------------
    // ASPECT-RATIO CORRECTION
    // Multiplying x by (width / height) prevents the noise
    // from being stretched on wide or tall viewports — circles
    // stay circular and aurora bands maintain proper proportion.
    // ----------------------------------------------------------
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = uv;
    p.x *= aspect;

    // ----------------------------------------------------------
    // MOUSE INFLUENCE
    // Nudge the noise coordinates slightly toward the mouse
    // position for a subtle interactive parallax feel.
    // The factor (0.12) keeps the effect gentle, not jarring.
    // ----------------------------------------------------------
    vec2 mouseEffect = (u_mouse - 0.5) * 0.12;
    p += mouseEffect;

    // ----------------------------------------------------------
    // TIME-BASED ANIMATION
    // A slow time scale (0.18) keeps the aurora graceful.
    // We feed 't' into warpedNoise so the flow field drifts.
    // ----------------------------------------------------------
    float t = u_time * 0.18;

    // ----------------------------------------------------------
    // FLOW FIELD SAMPLE
    // warpedNoise returns a value in roughly [0, 1].
    // We sample it at two slightly offset times to create
    // a secondary shimmer / breathing effect.
    // ----------------------------------------------------------
    float n1 = warpedNoise(p * 1.4, t);
    float n2 = warpedNoise(p * 1.1 + vec2(3.5, 1.7), t + 0.4);

    // Blend the two samples — n2 adds fine iridescence
    float field = mix(n1, n2, 0.35);

    // ----------------------------------------------------------
    // VIGNETTE
    // Darkens the edges of the canvas, focusing attention on
    // the centre and keeping the content overlay readable.
    // Computed in plain [0,1] UV space (no aspect correction).
    // ----------------------------------------------------------
    vec2 uvCentre = uv - 0.5;             // [-0.5, 0.5]
    float vignette = 1.0 - dot(uvCentre, uvCentre) * 1.8;
    vignette = clamp(vignette, 0.0, 1.0);

    // ----------------------------------------------------------
    // COLOR PALETTE — dark purple / violet / indigo / blue
    // Three anchor colors are blended based on field value and
    // vertical position so the aurora shifts tonally from top
    // (deeper indigo) to bottom (richer violet / magenta edge).
    // ----------------------------------------------------------

    // Deep space base — nearly black with a hint of indigo
    vec3 colBase    = vec3(0.03, 0.02, 0.08);

    // Mid aurora — soft violet / purple
    vec3 colMid     = vec3(0.22, 0.08, 0.45);

    // Bright veil — cool violet-blue highlight
    vec3 colBright  = vec3(0.38, 0.18, 0.72);

    // Accent shimmer — electric indigo, appears in peaks
    vec3 colAccent  = vec3(0.55, 0.20, 0.90);

    // Subtle warm edge — a trace of deep blue for richness
    vec3 colBlue    = vec3(0.10, 0.12, 0.55);

    // Blend base → mid → bright using field intensity
    vec3 col = mix(colBase, colMid,    smoothstep(0.2, 0.55, field));
    col       = mix(col,    colBright, smoothstep(0.45, 0.75, field));
    col       = mix(col,    colAccent, smoothstep(0.65, 0.90, field));

    // Layer the blue tint into darker regions for depth
    col = mix(col, colBlue, smoothstep(0.5, 0.2, field) * 0.4);

    // Vertical gradient — top leans cooler (indigo), bottom warmer (violet)
    col = mix(col, col * vec3(0.7, 0.6, 1.2), (1.0 - uv.y) * 0.25);

    // Apply vignette to darken edges
    col *= vignette;

    // Overall brightness trim — keeps the shader dark enough
    // for text to remain readable on top
    col *= 0.88;

    // ----------------------------------------------------------
    // PROCEDURAL GRAIN
    // Adds micro-noise at the pixel level to give the image an
    // organic, film-like texture rather than a flat CG look.
    // The seed mixes spatial coords with time so it animates
    // (dithering noise, not static grain).
    // ----------------------------------------------------------
    float grainSeed = dot(gl_FragCoord.xy, vec2(12.9898, 78.233))
                      + u_time * 0.5;
    float grain = fract(sin(grainSeed) * 43758.5453) - 0.5;

    // Scale grain subtly — 0.028 keeps it refined, not harsh
    col += grain * 0.028;

    // ----------------------------------------------------------
    // FINAL OUTPUT
    // Clamp to [0, 1] to prevent over-bright artefacts.
    // Alpha = 1.0 (fully opaque).
    // ----------------------------------------------------------
    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
