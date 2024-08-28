import type { Config } from 'tailwindcss';
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/theme/components**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        kakao: 'url("/icons/icon-kakao.svg")',
      },
      colors: {
        'olive-green': '#8a9455',
        black: '#333333',
        hover: '#f3f4ee',
      },
      screens: {
        'sm-md': { max: '1023px' },
        lg: { min: '1024px' },
      },
    },
    plugins: [
      function (addUtilities: any) {
        const newUtilities = {
          '.a11y-hidden': {
            overflow: 'hidden',
            position: 'absolute',
            clip: 'rect(0, 0, 0, 0)',
            'clip-path': 'circle(0)',
            width: '1px',
            height: '1px',
            margin: '-1px',
            border: '0',
            padding: '0',
            'white-space': 'nowrap',
          },
        };

        addUtilities(newUtilities);
      },
    ],
    important: true,
    corePlugins: {
      preflight: false,
    },
  },
});

export default config;
