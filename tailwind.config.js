/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#121212",
        "background-light": "#1E1E1E",
        text: "#E0E0E0",
        primary: "#FFD700", // Gold
        secondary: "#1E90FF", // Deep Blue
        accent: "#9370DB", // Medium Purple
        danger: "#FF4136", // Red
        success: "#3D9970", // Green
      },
      boxShadow: {
        "neon-glow": "0 0 5px theme('colors.primary'), 0 0 20px theme('colors.primary / 50%')",
        "soft-glow": "0 0 10px theme('colors.secondary / 70%')",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "subtle-glow": {
          "0%, 100%": { boxShadow: "0 0 5px theme('colors.primary / 50%')" },
          "50%": { boxShadow: "0 0 15px theme('colors.primary / 80%')" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideInUp: "slideInUp 0.5s ease-in-out",
        "subtle-glow": "subtle-glow 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
