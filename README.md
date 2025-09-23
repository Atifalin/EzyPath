# EzyPath Solutions India Website

A modern, responsive one-page website for EzyPath Solutions India built with Vite + React and custom React Bits components.

## 🚀 Features

- **Modern Tech Stack**: Vite + React for blazing fast development
- **Custom Animations**: React Bits components including RotatingText, ScrollVelocity, ClickSpark, and CountUp
- **Responsive Design**: Mobile-first approach with beautiful UI on all devices
- **Brand Consistency**: Uses EzyPath brand colors and typography
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **SEO Optimized**: Meta tags and structured content for better search visibility

## 📦 Installation

```bash
# Clone the repository
cd ezypath-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Brand Colors
Edit the CSS variables in `src/index.css`:

```css
--ezy-blue: #A6BDC4;      /* accent backgrounds */
--deep-blue: #0B6EA8;     /* brand primary */
--sunrise-gold: #F2B544;  /* highlight */
--ink: #1F2933;           /* text */
--cloud: #F5F7FA;         /* background */
```

### Rotating Words
Modify the word arrays in `src/components/Hero.jsx` and `src/components/Services.jsx`:

```javascript
// Hero.jsx
<RotatingText 
  words={["business", "creativity", "operations", "growth"]}
/>

// Services.jsx
rotatingWords: ['complexity', 'processes', 'workflows', 'operations']
```

### Contact Form
To connect the contact form to a real backend, update the form submission in `src/components/Contact.jsx`:

```javascript
// Replace the setTimeout with your actual API call
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 🏗️ Project Structure

```
ezypath-website/
├── public/
│   ├── logo-mark.svg       # Favicon and logo
│   ├── kruger-logo.svg     # Client logos
│   ├── compugen-logo.svg
│   ├── homeheros-logo.svg
│   ├── spark.svg           # ClickSpark effect
│   └── photo.svg           # Profile placeholder
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation with CardNav
│   │   ├── Hero.jsx        # Hero section with RotatingText
│   │   ├── WorkedWith.jsx  # Client logos with ScrollVelocity
│   │   ├── Services.jsx    # Services with CountUp
│   │   ├── About.jsx       # About section with ProfileCard
│   │   ├── Contact.jsx     # Contact form
│   │   ├── Footer.jsx      # Footer with company info
│   │   ├── RotatingText.jsx
│   │   ├── ScrollVelocity.jsx
│   │   ├── ClickSpark.jsx
│   │   └── CountUp.jsx
│   ├── App.jsx             # Main app component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles and CSS variables
│   └── main.jsx            # App entry point
├── index.html              # HTML template with meta tags
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## 📝 Key Components

### RotatingText
Animates through an array of words with smooth transitions.

### ScrollVelocity
Creates horizontal scrolling effect that responds to scroll velocity.

### ClickSpark
Adds spark animation on click interactions.

### CountUp
Animated number counter that triggers when in viewport.

## 🚢 Deployment

Build the project for production:

```bash
npm run build
```

The build output will be in the `dist` folder, ready to be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages

## 📧 Contact

- **Founder Email**: atif@ezypath.in
- **General Inquiries**: info@ezypath.in
- **Website**: [EzyPath.in](https://ezypath.in)
- **UDYAM No**: UDYAM-KR-05-0053516

## 📄 License

 2024 EzyPath Solutions India. All rights reserved.

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
