export type ImageSize = 'medium' | 'full';
export type ImageConfig = {
	thumbnail: boolean,
	size: 'medium' | 'full',
};

export const IMAGE_SIZES: Record<ImageSize, string> = {
	'medium': '400',
	'full': 'fhd',
}

export const getImageUrl = (id: string, config: ImageConfig) => {
	const { thumbnail, size } = config;
	const imageFormat = thumbnail ? 'thumbnail' : 'full';
	const imageSize = IMAGE_SIZES[size];

	return `http://localhost:8000/api/file/images/${imageFormat}/${imageSize}/${id}`;
}