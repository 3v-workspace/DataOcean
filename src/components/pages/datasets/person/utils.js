import { SOURCE } from './const';

export const checkSource = (data) => {
  const sourceName = Object.keys(SOURCE).find((item) => new RegExp(item).test(data.source));
  if (!sourceName) {
    throw new Error(`New type of source ${data.source}`);
  }
  return SOURCE[sourceName];
};
