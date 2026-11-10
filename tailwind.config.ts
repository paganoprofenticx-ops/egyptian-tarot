import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06080D",
          900: "#0A0E17",
          850: "#0D121D",
          800: "#111827",
          700: "#192235",
          600: "#243049",
        },
        gold: {
          DEFAULT: "#C9A227",
          bright: "#E4C078",
          soft: "#E8DCC0",
          deep: "#8C6E1F",
        },
        papyrus: {
          DEFAULT: "#EFE5CE",
          muted: "#C7BCA4",
          dim: "#9A9284",
        },
        lapis: "#1F3A6E",
        turquoise: "#2A9D8F",
        carnelian: "#B4472F",
        emerald: "#2F7D5B",
        violet: "#5B4B8A",
        silver: "#B9C2CC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      boxShadow: {
        gold: "0 22px 60px -28px rgba(201, 162, 39, 0.55)",
        card: "0 24px 70px -30px rgba(0, 0, 0, 0.9)",
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -30px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, #8C6E1F 0%, #C9A227 28%, #F0DEC0 50%, #C9A227 72%, #8C6E1F 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.4s ease-out both",
        shimmer: "shimmer 7s linear infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
      },
      maxWidth: {
        page: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
