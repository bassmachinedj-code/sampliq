/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Laravel-inspired dark theme
        brand: {
          50: '#fef3f2',
          100: '#ffe3e0',
          200: '#ffccc7',
          300: '#ffa8a0',
          400: '#ff7468',
          500: '#f94538',
          600: '#e6291b',
          700: '#c21f13',
          800: '#a11d13',
          900: '#851e17',
          950: '#490b06',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'display-xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'orbit': 'orbit 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(249, 69, 56, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(249, 69, 56, 0.6)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1024 1024\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3CradialGradient id=\'a\' cx=\'50%25\' cy=\'50%25\' r=\'50%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23f94538;stop-opacity:0.15\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:%23f94538;stop-opacity:0\'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill=\'url(%23a)\' width=\'1024\' height=\'1024\'/%3E%3C/svg%3E")',
        'grid-pattern': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg stroke=\'%23334155\' stroke-width=\'0.5\'%3E%3Cpath d=\'M0 0h60v60H0z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(249, 69, 56, 0.2)',
        'glow': '0 0 20px rgba(249, 69, 56, 0.3)',
        'glow-lg': '0 0 40px rgba(249, 69, 56, 0.4)',
        'glow-xl': '0 0 60px rgba(249, 69, 56, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(249, 69, 56, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        'elevated': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
