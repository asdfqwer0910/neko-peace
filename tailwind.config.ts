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
        'pattern-2': "url('/Cat.jpg')",
        'adoption-banner': "url('/Adoption.JPG')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        "tracking-in-contract-bck": "tracking-in-contract-bck 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1s both",
        "text-focus-in": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "tracking-in-expand": "tracking-in-expand 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) 2.3s  both",
        "scale-up-ver-top": "scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "scale-out-ver-top": "scale-out-ver-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
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
      }
    },
  },
  plugins: [],
}
export default config
