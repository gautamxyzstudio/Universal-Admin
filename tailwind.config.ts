import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/appcomponents/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: `#182452`,
        secondary: `#CCD4F2`,
        disable: '#868686',
        extraWhite: '#FAFAFA',
        borderGrey: '#EBEBEB',
      },
    },
  },
  plugins: [],
};
export default config;
