/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // LinkedIn Brand Colors
        linkedin: {
          blue: '#0A66C2',
          'blue-dark': '#004182',
          'blue-light': '#70B5F9',
          'blue-hover': '#004182',
        },
        // LinkedIn UI Colors
        li: {
          // Backgrounds
          'bg-primary': '#FFFFFF',
          'bg-secondary': '#F4F2EE',
          'bg-tertiary': '#E9E5DF',
          'bg-card': '#FFFFFF',
          // Text
          'text-primary': '#191919',
          'text-secondary': '#666666',
          'text-tertiary': '#00000099',
          'text-link': '#0A66C2',
          // Borders
          'border': '#E0DFDC',
          'border-dark': '#BBBAB8',
          // Status colors
          'success': '#057642',
          'success-bg': '#DDF2E6',
          'warning': '#915907',
          'warning-bg': '#FEF3E0',
          'error': '#CC1016',
          'error-bg': '#F9DEDE',
          // Premium
          'premium-gold': '#A68B5B',
          'premium-gold-light': '#F8C77E',
          'premium-bg': '#FFF9F0',
        },
      },
      boxShadow: {
        'linkedin': '0 0 0 1px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.08)',
        'linkedin-hover': '0 0 0 1px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.12)',
        'linkedin-card': '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
