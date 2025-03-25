module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        greenGlow: {
          "0%, 100%": { opacity: "0.2", boxShadow: "0 0 10px 5px rgba(97, 239, 97, 0.2)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 20px 10px rgba(97, 239, 97, 0.6)" },
        },
        redGlow: {
          "0%, 100%": { opacity: "0.2", boxShadow: "0 0 10px 5px rgba(239, 97, 97, 0.2)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 20px 10px rgba(239, 97, 97, 0.6)" },
        },
      },
      animation: {
        greenGlow: "greenGlow 2s infinite ease-in-out",
        redGlow: "redGlow 2s infinite ease-in-out",
      },
      colors: {
        customBgBlack: "#1f1f1f",
        customleftblack: "#121212",
        customGreen: "#10B981"
      },
    },
  },
  plugins: [],
};
