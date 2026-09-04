# Modern GLSL Shader Portfolio

A modern, responsive developer portfolio built around a custom fullscreen GLSL fragment shader. The project combines WebGL-based visual effects with accessible interface design, responsive layouts, and performance-conscious animation.

The fullscreen shader acts as the visual signature of the portfolio, creating an atmospheric animated background while keeping the main content clear and readable.

## ✨ Features

* Custom fullscreen GLSL fragment shader
* Interactive cursor-based shader movement
* Time-based shader animation
* Responsive WebGL rendering
* `u_time`, `u_resolution`, and `u_mouse` uniforms
* Custom procedural aurora/nebula visual effect
* Subtle procedural grain
* Dark purple and indigo visual identity
* Responsive navigation
* Project showcase
* Skills section
* Experience section
* Contact section
* Smooth scrolling
* Accessible interface
* Keyboard-friendly navigation
* Reduced-motion support
* WebGL fallback
* Device pixel ratio capped for performance
* Animation pauses when the browser tab is hidden

## 🛠️ Tech Stack

* React
* Vite
* JavaScript
* HTML5
* CSS3
* WebGL
* GLSL
* Three.js

## 🎨 Shader Implementation

The hero background is rendered using a custom GLSL fragment shader rather than a pre-built animated background.

The shader uses three core uniforms:

### `u_time`

Controls time-based movement inside the shader, allowing the visual field to evolve continuously.

### `u_resolution`

Provides the current rendering dimensions and allows the shader to maintain the correct aspect ratio across different screen sizes.

### `u_mouse`

Provides cursor interaction, allowing the shader's flow to subtly respond to the user's pointer position.

The shader combines procedural movement, layered color gradients, noise, and subtle grain to create an organic atmospheric effect.

## 📁 Project Structure

```text
modern-glsl-shader-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ShaderHero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   └── Contact.jsx
│   ├── shaders/
│   │   └── aurora.frag
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## ⚡ Performance

Performance was considered as part of the visual implementation rather than added afterward.

### Device Pixel Ratio

The rendering resolution is capped to prevent unnecessarily expensive rendering on high-DPI displays.

```javascript
Math.min(window.devicePixelRatio, 2)
```

### Hidden Tab Optimization

The animation loop pauses when the browser tab is hidden and resumes when the user returns.

This avoids unnecessary GPU and CPU usage when the page is not visible.

### Reduced Motion

The website respects the user's `prefers-reduced-motion` setting.

When reduced motion is enabled, the animated shader is replaced with a static gradient using the same visual palette.

### WebGL Fallback

If WebGL is unavailable, the hero remains usable through a CSS-based static gradient rather than leaving the user with a broken or empty background.

## ♿ Accessibility

The interface follows basic accessibility practices, including:

* Semantic HTML structure
* Accessible navigation
* Keyboard-friendly interactive elements
* Visible focus states
* Readable text contrast
* Reduced-motion support
* Non-essential animation only
* Content that remains usable without WebGL

## 📱 Responsive Design

The portfolio is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The shader automatically adapts to viewport dimensions while the interface layout adjusts typography, spacing, navigation, and content cards for smaller screens.

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/nabihasaleem627/modern-glsl-shader-portfolio.git
```

### Navigate to the project

```bash
cd modern-glsl-shader-portfolio
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

The project can be deployed using platforms such as Vercel, Netlify, or GitHub Pages.

For Vercel, connect the GitHub repository and use:

```text
Build Command: npm run build
Output Directory: dist
```

## 📌 Assignment Context

This project was developed as part of the **Frontend AI Engineering Week 8: Signature Hero - A Fullscreen Shader** assignment.

The objective was to move beyond a conventional portfolio background and create a personalized visual signature using GLSL and WebGL.

### Assignment Requirements Covered

| Requirement                 | Status |
| --------------------------- | ------ |
| Custom GLSL fragment shader | ✅      |
| Fullscreen hero             | ✅      |
| Real content over shader    | ✅      |
| `u_time`                    | ✅      |
| `u_resolution`              | ✅      |
| `u_mouse`                   | ✅      |
| Readable hero content       | ✅      |
| Capped devicePixelRatio     | ✅      |
| Hidden-tab animation pause  | ✅      |
| Reduced-motion fallback     | ✅      |
| WebGL fallback              | ✅      |
| Responsive implementation   | ✅      |
| Commented shader source     | ✅      |

## 🎯 Reduced-Motion / Performance Fallback

**Reduced-motion users receive a static gradient, while animation is paused when the tab is hidden and rendering resolution is capped to reduce unnecessary GPU usage.**

## 👩‍💻 Author

**Nabiha Saleem**

Full Stack Web Developer

---

Built with React, WebGL, GLSL, and a focus on creating distinctive interactive web experiences.
