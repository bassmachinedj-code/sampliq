# Sampliq

The Skyscanner of audio samples. Search across Splice, Loopcloud, LANDR, and more in one place.

Built with React, Vite, Tailwind CSS, and Framer Motion. Premium dark theme inspired by Laravel Forge/Cloud.

## ✨ Features

- **Universal Sample Search** - Search 15+ sample platforms simultaneously
- **Premium Dark UI** - Laravel-inspired design with beautiful animations
- **Smart Filters** - Filter by BPM, key, genre, type, platform
- **In-Browser Preview** - Listen to samples with waveform visualization
- **Favorites & Collections** - Organize samples by project
- **Responsive Design** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Extract the project**

2. **Install dependencies**
```bash
cd project
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
project/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Header, Footer, Navigation
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page with search
│   │   ├── FeaturesPage.jsx    # Features showcase
│   │   ├── PricingPage.jsx     # Pricing plans
│   │   ├── DashboardPage.jsx   # User dashboard
│   │   └── SearchPage.jsx      # Sample search interface
│   ├── styles/
│   │   └── globals.css         # Tailwind + custom styles
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Routes configuration
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎨 Design System

### Colors

- **Brand**: Red/coral gradient (#f94538 - #ff7468)
- **Surface**: Dark slate palette (#020617 - #f8fafc)
- **Accents**: Cyan, Purple, Emerald, Amber

### Typography

- **Display Font**: Cabinet Grotesk
- **Body Font**: Plus Jakarta Sans
- **Mono Font**: JetBrains Mono

## 📱 Pages Overview

### Home Page (`/`)
- Hero with prominent search bar
- Connected platforms showcase
- Features grid
- How it works section
- Testimonials
- CTA section

### Features Page (`/features`)
- Main features with visuals
- Connected platforms list
- Small features grid

### Pricing Page (`/pricing`)
- Monthly/Annual toggle
- Three pricing tiers (Free, Pro, Team)
- FAQ section

### Dashboard (`/dashboard`)
- Sidebar navigation
- Quick search shortcuts
- Recent samples history
- Favorites & collections

### Search Page (`/search`)
- Full search interface
- Filters (BPM, key, type, platform)
- Sample results with waveform preview
- Play/pause, favorite, download actions

## 🌐 Deployment

### Vercel

```bash
npm run build
vercel deploy
```

### Netlify

```bash
npm run build
# Deploy dist folder
```

## 📦 Dependencies

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📄 License

MIT License

---

Built with ❤️ for music producers everywhere
