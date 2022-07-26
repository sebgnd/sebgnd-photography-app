import { ImageStatus, ImageStatusRecord } from './gallery.types';

export const isImageStatus = (value: string): value is ImageStatus => {
  const statuses = ['processing', 'valid', 'error', 'unknown'];

  return statuses.includes(value);
};
export type ItemWithAnyStatus = {
  id: string,
  status: string,
};

export const reduceImageStatuses = (
  statuses: ImageStatusRecord,
  items: ReadonlyArray<ItemWithAnyStatus>,
) => {
  return items.reduce((acc, item) => {
    const receivedStatus = isImageStatus(item.status)?
      item.status :
      'unknown';

    return {
      ...acc,
      [item.id]: statuses[item.id] ?
        statuses[item.id] :
        receivedStatus,
    };
  }, statuses);
};
