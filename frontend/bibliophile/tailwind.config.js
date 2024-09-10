/** @type {import('tailwindcss').Config} */
module.exports = {
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
      "olive": "#C5D887",
      "gray-green": "#EAEFE8",
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
    },
  },
  plugins: [],
};
