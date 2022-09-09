const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.938rem'
      }
    },
    screens: Object.fromEntries(Object.entries(defaultTheme.screens).filter(([key, value]) => key !== '2xl')),
    fontFamily: {
      sans: ['Mulish', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans']
    },
    extend: {
      fontSize: {
        none: ['0', '0'],
        super: ['5rem', {lineHeight: '5.5rem', letterSpacing: '0.03em'}], //80/88
        hero: ['3.5rem', {lineHeight: '4rem', letterSpacing: '0.03em'}], //56/64
        h1: ['2.5rem', {lineHeight: '3rem', letterSpacing: '0.03em'}], // 40/48
        h2: ['1.75rem', {lineHeight: '2.25rem', letterSpacing: '0.03em'}], // 28/36
        h3: ['1.5rem', {lineHeight: '2rem', letterSpacing: '0.03em'}], // 24/32
        h4: ['1.25rem', {lineHeight: '1.75rem', letterSpacing: '0.03em'}], // 20/28
        h5: ['1.25rem', {lineHeight: '1.75rem', letterSpacing: '0.03em'}], // 20/28
        base: ['1rem', {lineHeight: '1.5rem', letterSpacing: '0.03em'}], // 16/24
        caption: ['0.75rem', {lineHeight: '1.25rem', letterSpacing: '0.03em'}] // 12/20
      },
      lineHeight: {
        0: '0'
      },
      letterSpacing: {
        3: '0.03em', // -3%
        2: '0.02em', // -2%
        1: '0.01em' // -1%
      },
      screens: {
        '2xl': '1440px'
      },
      colors: {
        'abc-blue': '#4B9AE8',
        'abc-dark-blue': '#3D99D3',
        'abc-light-blue': '#3CC7F4',
        'abc-aqua': '#56CCF2', //aqua
        'abc-light-aqua': '#A8CEF4',
        'abc-deep-green': '#3B8260', //dark green
        'abc-light-red': '#D14F4F', //red
        'abc-orange': '#F2994A', //orange
        'abc-purple': '#BB6BD9', //purple
        'abc-pink': '#FED0EE', //pink
        'abc-yellow': '#DBA936',
        'abc-light-yellow': '#FBE38E', //light yellow
        'abc-grey': '#D9D9D9',
        'abc-light-grey': '#EDF2F7',
        'abc-dark-grey': '#4F4F4F', //dark grey
        'abc-red': '#FF0000',
        colors: {
          blue: {
            50: '#f6fafe',
            100: '#edf5fd',
            200: '#d2e6f9',
            300: '#b7d7f6',
            400: '#81b8ef',
            500: '#4b9ae8',
            600: '#448bd1',
            700: '#3874ae',
            800: '#2d5c8b',
            900: '#254b72'
          }
        }
      },
      backgroundImage: {
        'gradient-45deg': 'linear-gradient(45deg, var(--tw-gradient-stops))'
      },
      maxWidth: {
        '1/2': '50%',
        '2/3': '66.666667%'
      },
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        offcanvasoverlay: '1040',
        offcanvas: '1045',
        modaloverlay: '1050',
        modal: '1055',
        popover: '1070',
        tooltip: '1080',
        toast: '1090'
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
        top: 'top',
        spacing: 'margin, padding'
      },
      transitionDuration: {
        0: '0ms',
        1500: '1500ms',
        2000: '2000ms',
        10000: '10000ms'
      },
      transitionTimingFunction: {
        // https://cubic-bezier.com/
        'in-out': 'cubic-bezier(.68,.12,.38,.87)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
      },
      animation: {
        'h-line': 'hLine 200ms ease-in-out infinite',
        'zoom-in': 'zoomIn 6s',
        'zoom-out': 'zoomOut 6s'
      },
      animationDelay: {
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms'
      },
      keyframes: {
        hLine: {
          '0%': {width: '0px'},
          '100%': {width: '100%'}
        },
        zoomIn: {
          '0%': {transform: 'translateY(0) scale(1, 1)'},
          '100%': {transform: 'translateY(-20px) scale(1.3, 1.3)'}
        },
        zoomOut: {
          '0%': {transform: 'translateY(-20px) scale(1.3, 1.3)'},
          '100%': {transform: 'translateY(0) scale(1, 1)'}
        }
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: theme('maxWidth.full')
          }
        },
        pp: {
          color: theme('colors.white'),
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.white'),
            '--tw-prose-hr': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.white'),
            '--tw-prose-quote-borders': theme('colors.white'),
            '--tw-prose-captions': theme('colors.white'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-pre-bg': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.white'),
            '--tw-prose-td-borders': theme('colors.white')
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({addUtilities, theme, e}) {
      const animationDelayValues = theme('animationDelay');
      addUtilities(
        Object.entries(animationDelayValues).map(([key, value]) => {
          return {
            [`.${e(`animate-delay-${key}`)}`]: {animationDelay: `${value}`}
          };
        })
      );
      addUtilities({
        '.invalid': {
          fontSize: theme('fontSize.xs'),
          color: theme('colors.pp-dark-red'),
          fontStyle: 'italic'
        },
        '.overflow-initial': {
          overflow: 'initial'
        },
        '.hash-anchor-offset': {
          content: '',
          display: 'block',
          visibility: 'hidden',
          marginTop: '-100px',
          height: '100px'
        }
      });
    })
  ]
};
