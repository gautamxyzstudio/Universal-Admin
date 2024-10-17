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
        primary: '#FF7312',
        secondary: `#CCD4F2`,
        disable: '#868686',
        red: '#C11919',
        green: '#469C73',
        yellow: '#FBC505',
        extraWhite: '#FAFAFA',
        borderGrey: '#EBEBEB',
        Black: '#121212',
        externalLink:'#2048E0'
      },
      borderRadius: {
        custom: '0px 16px 16px 0px',
      },
      fontSize: {
        'heading-40': [
          '2.5rem',
          {
            lineHeight: '2.75rem',
            fontWeight: '700',
          },
        ],
        'subHeading-24': [
          '1.5rem',
          {
            lineHeight: '1.75rem',
          },
        ],
      },
    },
  },
  plugins: [],
};

module.exports = config;
