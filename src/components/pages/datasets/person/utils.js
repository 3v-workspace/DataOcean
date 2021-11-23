import { SOURCE } from './const';

export const checkSource = (data) => {
  const sourceName = Object.keys(SOURCE).find((item) => new RegExp(item).test(data.source));
  return SOURCE[sourceName] || '---';
};
