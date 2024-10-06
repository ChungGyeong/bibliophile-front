/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "white": "#fff",
      "light-gray": "#EEEEEE",
      "soft-gray": "#DDDDDD",
      "gray": "#BBBBBB",
      "medium-gray": "#777777",
      "dark-gray": "#444444",
      "black": "#000",
      "orange": "#FFA644",
      "active-orange": "#FF7628",
      "light-yellow": "#FFFAE6",
      "yellow": "#FFD66C",
      "light-olive": "#E6F0B2",
      "olive": "#C5D887",
      "medium-olive": "#A7BC61",
      "dark-olive": "#728632",
      "very-dark-olive": "#425112",
      "gray-green": "#EAEFE8",
    },
    screens: {
      mobile: "320px",
      tablet: "600px",
    },
    extend: {
      fontFamily: {
        "light": ["Pretendard-Light", "system-ui"],
        "regular": ["Pretendard-Regular", "system-ui"],
        "medium": ["Pretendard-Medium", "system-ui"],
        "bold": ["Pretendard-Bold", "system-ui"],
        "extra-bold": ["Pretendard-ExtraBold", "system-ui"],
      },
      boxShadow: {
        "custom-inner": "2px 2px 6px 0px rgba(0, 0, 0, 0.10) inset",
        "navbar": "0px -2px 6px 0px rgba(0, 0, 0, 0.10)",
        "custom": "2px 2px 6px 0px rgba(0, 0, 0, 0.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
