export type ImageSize = 'medium' | 'full' | 'small';
export type ImageConfig = {
	id?: string | null,
	thumbnail: boolean,
	size: ImageSize,
};

export const IMAGE_SIZES: Record<ImageSize, string> = {
	'medium': '400',
	'full': '1080',
	'small': '80',
}

export const getImageUrl = (config: ImageConfig) => {
	const { thumbnail, size, id } = config;

	if (!id) {
		return undefined;
	}

	const imageFormat = thumbnail ? 'thumbnail' : 'full';
	const imageSize = IMAGE_SIZES[size];

	return `http://localhost:8000/api/file/images/${imageFormat}/${imageSize}/${id}`;
}