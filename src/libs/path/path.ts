export const getFileExtension = (name: string) => {
  const nameElements = name.split('.');

  if (nameElements.length < 2) {
    throw new Error('Invalid file name');
  }

  return nameElements[nameElements.length - 1].toLowerCase();
}