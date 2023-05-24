import { DefinedUseQueryResult } from '@tanstack/react-query';

import { ColorHex } from 'types';

export function useIsLoading(queries: DefinedUseQueryResult[]) {
  return {
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isFetched: queries.every((query) => query.isFetched),
  };
}

export function convertPixelCountToHA(value: number, options?: Intl.NumberFormatOptions) {
  const v = Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    style: 'unit',
    unit: 'hectare',
    unitDisplay: 'short',
    ...options,
  });

  return v.format(value * 3086.9136).replace(/(\d+)([A-Za-z]+)/, '$1 $2');
}

export function convertHexToRgbaArray(hex: ColorHex, opacity: number = 1): number[] {
  const hexValue = hex.replace(/^#/, '');
  const red = parseInt(hexValue.substring(0, 2), 16);
  const green = parseInt(hexValue.substring(2, 4), 16);
  const blue = parseInt(hexValue.substring(4, 6), 16);
  const alpha = opacity * 255;
  return [red, green, blue, alpha];
}

export function getArrayValue(prev: readonly number[], key: number) {
  const fs = [...prev];

  if (fs.length === 1) {
    return [];
  } else {
    return [key];
  }
}

export function getArrayGroupValue(prev: readonly number[], ids: readonly number[]) {
  const prevIds = [...prev];

  // if all ids are in prevIds, remove all
  if (!!prevIds.length) {
    if (prevIds.every((id) => ids.includes(id))) {
      return [];
    }

    // just remove ids that are not in prevIds to preseve current selection
    return ids.filter((id) => prevIds.includes(id));
  } else {
    return ids;
  }
}
