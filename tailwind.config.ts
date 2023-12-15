import type { Config } from 'tailwindcss'
import buttonPlugin from './plugins/buttonPlugin'
import inputPlugin from './plugins/inputPlugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
    },
    fontFamily: {

    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '172': '43rem',
        '180': '45rem'
      }

    },
  },
  plugins: [
    buttonPlugin,
    inputPlugin,
  ],
}
export default config
