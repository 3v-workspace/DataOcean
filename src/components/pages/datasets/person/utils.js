import { SOURCE } from './const';

export const checkSource = (data) => {
  const sourceName = SOURCE[data.source];
  if (!sourceName) {
    throw new Error(`New type of source ${data.source}`);
  }
  return sourceName;
};
