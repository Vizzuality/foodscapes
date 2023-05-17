import { DefinedUseQueryResult } from '@tanstack/react-query';

import { ColorHex } from 'types';

export function useIsLoading(queries: DefinedUseQueryResult[]) {
  return {
    isLoading: queries.some((query) => query.isLoading),
    isFetching: queries.some((query) => query.isFetching),
    isFetched: queries.every((query) => query.isFetched),
  };
}

export function convertPixelCountToHA(value: number, factor = 1) {
  return (value * 3086.9136) / factor;
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

export function getArrayGroupValue(prev: readonly number[], key: number, ids: readonly number[]) {
  const fs = [...prev];

  // if all ids are in fs, remove all
  if (fs.length === ids.length) {
    return [];
  } else {
    return ids;
  }
}
