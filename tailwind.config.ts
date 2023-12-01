import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern-2': "url('/Home.JPG')",
        'adoption-banner': "url('/Adoption.JPG')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        "tracking-in-contract-bck": "tracking-in-contract-bck 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.75s both",
        "text-focus-in": "text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "text-focus-in-3": "text-focus-in 3s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "tracking-in-expand": "tracking-in-expand 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) 2s  both",
        "scale-up-ver-top": "scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "scale-out-ver-top": "scale-out-ver-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "scale-up-center": "scale-up-center 1s cubic-bezier(0.390, 0.575, 0.565, 1.000)  both",
        "fade-in": "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "tracking-in-contract-bck-bottom": "tracking-in-contract-bck-bottom 2.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "tracking-in-contract": "tracking-in-contract 2.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
      },
      keyframes: {
        "tracking-in-contract-bck": {
            "0%": {
                "letter-spacing": "1em",
                transform: "translateZ(400px)",
                opacity: "0"
            },
            "40%": {
                opacity: ".6"
            },
            to: {
                transform: "translateZ(0)",
                opacity: "1"
            }
        },
        "text-focus-in": {
          "0%": {
              filter: "blur(12px)",
              opacity: "0"
          },
          to: {
              filter: "blur(0)",
              opacity: "1"
          }
        },
        "text-focus-in-3": {
          "0%": {
              filter: "blur(12px)",
              opacity: "0"
          },
          to: {
              filter: "blur(0)",
              opacity: "1"
          }
        },
        "tracking-in-expand": {
          "0%": {
              "letter-spacing": "-.5em",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              opacity: "1"
          }
        },
        "scale-up-ver-top": {
          "0%": {
              transform: "scaleY(.4)",
              "transform-origin": "100% 0%"
          },
          to: {
              transform: "scaleY(1)",
              "transform-origin": "100% 0%"
          }
        },
        "scale-out-ver-top": {
          "0%": {
              transform: "scaleY(1)",
              "transform-origin": "100% 0%",
              opacity: "1"
          },
          to: {
              transform: "scaleY(0)",
              "transform-origin": "100% 0%",
              opacity: "1"
          }
        },
        "scale-up-center": {
          "0%": {
              transform: "scale(.5)"
          },
          to: {
              transform: "scale(1)"
          }
        },
        "fade-in": {
          "0%": {
              opacity: "0"
          },
          to: {
              opacity: "1"
          }
        },
        "tracking-in-contract-bck-bottom": {
          "0%": {
              "letter-spacing": "1em",
              transform: "translateZ(400px) translateY(300px)",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              transform: "translateZ(0) translateY(0)",
              opacity: "1"
          }
        },
        "tracking-in-contract": {
          "0%": {
              "letter-spacing": "1em",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              "letter-spacing": "normal",
              opacity: "1"
          }
        },
      }
    },
  },
  plugins: [],
}
export default config
