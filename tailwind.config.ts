import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffc500",
        secondary: "#7700ff",
        // highlight: "#A348F6",
        // accent: "#0047FF",
        // accentDark: "#168FFF",
        button: "#ffc500XX",
        buttonHover: "#cc9d00",
        textPrimary: "#312f27",
        textPrimaryHover: "#000",
        textSecondary: "#fff",
        textSecondaryHover: "#aaa",
        // borderDiv: "#B8B8B8",
      },
      screens: {
        "-2xl": { max: "1535px" },
        "-xl": { max: "1279px" },
        "-lg": { max: "1024px" },
        "-md": { max: "768px" },
        "-sm": { max: "640px" },
        "3xl": { min: "1820px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
