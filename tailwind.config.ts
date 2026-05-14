import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        glow: "0 28px 90px rgba(30, 41, 59, 0.14)",
        "soft-ring": "0 0 0 1px rgba(255,255,255,0.65), 0 32px 90px rgba(15,23,42,0.13)"
      },
      keyframes: {
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.94)" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-90px) scale(1.18)" }
        },
        "ring-burst": {
          "0%": { opacity: "0.55", transform: "scale(0.45)" },
          "100%": { opacity: "0", transform: "scale(1.65)" }
        }
      },
      animation: {
        "gradient-flow": "gradient-flow 16s ease infinite",
        "float-up": "float-up 1.9s ease-out forwards",
        "ring-burst": "ring-burst 900ms ease-out forwards"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;
