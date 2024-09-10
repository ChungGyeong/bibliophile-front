/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#fff",
      lightGray: "#EEEEEE",
      softGray: "#DDDDDD",
      gray: "#BBBBBB",
      mediumGray: "#777777",
      darkGray: "#444444",
      black: "#000",
      orange: "#FFA644",
      activeOrange: "#FF7628",
      lightYellow: "#FFFAE6",
      yellow: "#FFD66C",
      olive: "#C5D887",
      grayGreen: "#EAEFE8",
    },
    extend: {
      fontFamily: {
        light: ["Pretendard-Light", "system-ui"],
        regular: ["Pretendard-Regular", "system-ui"],
        medium: ["Pretendard-Medium", "system-ui"],
        bold: ["Pretendard-Bold", "system-ui"],
        extraBold: ["Pretendard-ExtraBold", "system-ui"],
      },
      boxShadow: {
        customInner: "2px 2px 6px 0px rgba(0, 0, 0, 0.10) inset",
        navbar: "0px -2px 6px 0px rgba(0, 0, 0, 0.10)",
        custom: "2px 2px 6px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [],
};
