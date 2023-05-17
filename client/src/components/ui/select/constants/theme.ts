const THEME = {
  dark: {
    container: 'text-white text-sm',
    button: {
      base: 'w-full text-left transition duration-150 ease-in-out cursor-pointer border bg-gray-700',
      states: {
        none: 'border-white',
        error: 'border-red-500',
        valid: 'border-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-gray-500',
    menuHeader: 'bg-gray-500',
    item: {
      base: 'text-xs text-white',
      active: 'bg-black text-white',
      selected: 'bg-gray-700 text-white',
      disabled: 'opacity-40 text-white',
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
    base: 'pl-1 pr-1 py-3 text-sm',
    s: 'pl-1 pr-1 py-1.5 text-sm',
    none: 'pr-10',
  },
};

export default THEME;
