
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002541",
        "primary-container": "#123B5D",
        secondary: "#006A66",
        surface: "#F7FAFD",
        "surface-container-low": "#F1F4F7",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-high": "#E5E8EB",
        outline: "#73777F",
        error: "#BA1A1A",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        headline: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
