import type { Config } from 'tailwindcss';
import withMT from '@material-tailwind/react/utils/withMT';
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

module.exports = withMT(config);
