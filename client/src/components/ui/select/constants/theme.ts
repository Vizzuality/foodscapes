const THEME = {
  dark: {
    container: 'text-white text-sm',
    button: {
      base: 'flex justify-between items-center italic w-full text-left transition duration-150 ease-in-out cursor-pointer border bg-gray-700 px-4',
      states: {
        none: 'border-white',
        error: 'border-red-500',
        valid: 'border-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-white border border-navy-400/50',
    menuHeader: 'bg-white',
    item: {
      base: 'text-xs text-navy-500 uppercase',
      active: 'bg-white font-bold',
      selected: 'bg-white font-semibold',
      disabled: 'font-normal',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  light: {
    container: 'text-gray-600 text-sm',
    button: {
      base: 'flex justify-between items-center w-full text-left transition duration-150 ease-in-out cursor-pointer border-b border-dashed bg-white',
      states: {
        none: 'border-gray-800',
        error: 'border-red-500',
        valid: 'border-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-white border border-gray-800',
    menuHeader: 'bg-white',
    item: {
      base: 'text-xs',
      active: 'bg-gray-400/5 text-black',
      selected: 'bg-gray-400/10 text-black',
      disabled: 'opacity-40 text-black',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  none: {
    container: 'w-auto inline-flex',
    button: {
      base: '',
      states: {
        none: '',
        error: 'text-red-500',
        valid: 'text-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-white text-gray-700',
    menuHeader: 'bg-white',
    item: {
      base: 'text-xs',
      active: 'bg-gray-100 text-black',
      selected: 'bg-black/10 text-black',
      disabled: 'opacity-40 text-black',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  sizes: {
    base: 'px-0 py-3 text-sm',
    s: 'px-0 py-1.5 text-sm',
    none: 'pr-10',
  },
};

export default THEME;
