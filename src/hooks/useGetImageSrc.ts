import {IImageAttributes, IImageFormat} from '@/types';

import useMediaQuery from './useMediaQuery';

export function useGetImageSrc(
  image: IImageAttributes,
  query?: 'large' | 'medium' | 'small' | 'thumbnail'
): IImageFormat | null {
  const large = useMediaQuery('(max-width: 1280px)');
  const medium = useMediaQuery('(max-width: 768px)');
  const small = useMediaQuery('(max-width: 640px)');

  if (!image || (query && !image.formats[query])) return null;

  let currentType: IImageFormat = {} as IImageFormat;

  if (large) currentType = image.formats.large;
  if (medium) currentType = image.formats.medium;
  if (small) currentType = image.formats.small;

  if (query) currentType = image.formats[query];

  return currentType;
}
