/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#15171B",
          900: "#1C1E22",
          800: "#24272D",
          700: "#2E323A",
          600: "#3A3F49"
        },
        ivory: "#E8E6E1",
        muted: "#8A8F98",
        amber: {
          DEFAULT: "#F2A93B",
          soft: "#F7C878"
        },
        teal: {
          DEFAULT: "#3FB8AF",
          soft: "#7FD8D0"
        },
        crimson: "#E5484D"
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        bezel: "inset 0 0 0 1px rgba(232,230,225,0.06), 0 20px 60px -20px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};
