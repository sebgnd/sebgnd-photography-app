export type ImageSize = 'medium' | 'full' | 'small';
export type ImageConfig = {
  thumbnail: boolean,
  size: ImageSize,
};

export const IMAGE_SIZES: Record<ImageSize, string> = {
  'medium': '400',
  'full': '1080',
  'small': '80',
};

export const getImageUrl = (id: string, config: ImageConfig) => {
  const { thumbnail, size } = config;

  const imageFormat = thumbnail ? 'thumbnail' : 'full';
  const imageSize = IMAGE_SIZES[size];

  if (!process.env.REACT_APP_API) {
    throw new Error('API URL not set');
  }

  return `${process.env.REACT_APP_API}/file/images/${imageFormat}/${imageSize}/${id}`;
};

export const getImageUrlOrUndefined = (id: string | null, config: ImageConfig) => {
  if (id === null) {
    return undefined;
  }

  return getImageUrl(id, config);
};
