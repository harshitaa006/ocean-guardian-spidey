// Shared Tailwind Play CDN configuration for Ocean Guardian.
// Loaded on every page right after the Tailwind CDN script.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        abyss: "#03060f", // deepest background
        deep: "#0a1024", // primary navy background
        surface: "#111a35", // card / panel base
        surface2: "#17224a", // raised panel
        cyan: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
          deep: "#0891b2",
        },
        teal: {
          DEFAULT: "#2dd4bf",
        },
        foam: "#e6f6fb", // near-white text
        mute: "#93a4c7", // muted text
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Outfit"', '"Inter"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(34, 211, 238, 0.45)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        rise: "rise 0.7s ease-out both",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
};
