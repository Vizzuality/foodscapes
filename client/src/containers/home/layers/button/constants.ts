import cn from 'lib/classnames';

export const THEME = {
  green: {
    default: cn({
      'text-navy bg-green-500 hover:bg-green-700 active:bg-navy active:text-navy active:bg-green-700':
        true,
    }),
    selected: 'bg-navy text-green-500 hover:bg-navy/90 active:bg-navy/75 active:text-green-500',
    unselected: 'bg-green-200',
    ping: 'z-0 bg-green-200 absolute w-full h-full animate-ping1 rounded-3xl',
  },

  red: {
    default:
      'text-navy bg-red-500 hover:bg-red-700 active:bg-navy active:text-navy active:bg-red-700',
    selected: 'bg-navy text-red-500 hover:bg-navy/90 active:bg-navy/75 active:text-red-500',
    unselected: 'bg-red-200 ',
    ping: 'z-0 bg-red-200 absolute w-full h-full animate-ping2 rounded-3xl',
  },

  yellow: {
    default:
      'text-navy bg-yellow-500 hover:bg-yellow-700 active:bg-navy active:text-navy active:bg-yellow-700',
    selected: 'bg-navy text-yellow-500 hover:bg-navy/90 active:bg-navy/75 active:text-yellow-500',
    unselected: 'bg-yellow-200 ',
    ping: 'z-0 bg-yellow-200 absolute w-full h-full animate-ping3 rounded-3xl',
  },
};

export const SIZE = {
  xs: 'text-sm px-2 py-0.5',
  s: 'text-sm px-3 py-0.5',
  base: 'text-sm px-8 py-2',
  l: 'text-base px-8 py-3',
  xl: 'text-base px-14 py-3',
};
