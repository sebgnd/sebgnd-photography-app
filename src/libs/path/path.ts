export type FileExtension = '.png' | '.jpg' | '.jpeg';
export type FileType = 'png' | 'jpg';

export const getFileExtension = (name: string) => {
  const nameElements = name.split('.');

  if (nameElements.length < 2) {
    throw new Error('Invalid file name');
  }

  return `.${nameElements[nameElements.length - 1].toLowerCase()}`;
}

export const getPossibleExtensionsByType = (type: FileType): FileExtension[] => {
	switch (type) {
		case 'jpg': return ['.jpg', '.jpeg'];
		case 'png': return ['.png'];
		default: throw new Error('Unknown file type');
	}
}