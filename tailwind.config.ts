import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        blue: {
          '50': '#edfcff',
          '100': '#d6f6ff',
          '200': '#b5f1ff',
          '300': '#83ebff',
          '400': '#48dcff',
          '500': '#0092ff',
          '600': '#06a5ff',
          '700': '#0092ff',
          '800': '#086fc5',
          '900': '#0d5e9b',
          '950': '#0e395d',
        },
        green: {
          '50': '#f1fcf5',
          '100': '#defaeb',
          '200': '#bff3d6',
          '300': '#8ce9b6',
          '400': '#53d58e',
          '500': '#2cbc6e',
          '600': '#1e9b57',
          '700': '#1b7a48',
          '800': '#1b603b',
          '900': '#184f33',
          '950': '#072c19',
        },
      },
    },
  },
}
