import type { Config } from 'tailwindcss';
const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/appcomponents/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: '#FF7312',
                primaryLight: '#FFF8F4',
                secondary: `#CCD4F2`,
                disable: '#868686',
                backgroundLight: '#F2F2F2',
                red: '#C11919',
                green: '#469C73',
                accentColor: '#182452',
                lightGreen: 'rgba(70, 156, 115, 0.20)',
                lightRed: 'rgba(193, 25, 25, 0.20)',
                statusLightGreen: '#ECFFF6',
                yellow: '#FBC505',
                extraWhite: '#FAFAFA',
                borderGrey: '#EBEBEB',
                textBlack: '#121212',
                Black: '#121212',
                loginBgcolor: '#0E0E0E',
                modal: 'rgba(0, 0, 0, 0.2)',
                borderGreySecondary: '#dbdbdb',
                externalLink: '#2048E0',
                lightPrimary: '#FFF8F4',
                lightGreenSecondary: '#F6FFFB',
                lightRedSecondary: '#FFF4F4',
                darkBlue: '#182452',
                skyBlue: '#1985C1',
                lightSkyBlue: '#F6FCFF',
                secondaryShade: '#F1F4FF',
                textFieldBorder: '#E0E3E7',
                
            },
            borderRadius: {
                custom: '0px 16px 16px 0px'
            },

            boxShadow: {
                'custom-shadow': '0px 0px 6px 0px rgba(18, 18, 18, 0.08)',
                'loginForm': '0px 0px 8px 0px rgba(255,255,255, 0.07)'
            },
            fontSize: {
                'heading-40': [
                    '2.5rem',
                    {
                        lineHeight: '2.75rem',
                        fontWeight: '700'
                    }
                ],
                'subHeading-24': [
                    '1.5rem',
                    {
                        lineHeight: '1.75rem'
                    }
                ],
                'text-12': [
                    '0.75rem',
                    {
                        lineHeight: '1rem'
                    }
                ],
                'text-md': [
                    '1rem',
                    {
                        lineHeight: '1.25rem'
                    }
                ]
            }
        }
    },
    plugins: []
};

module.exports = config;
