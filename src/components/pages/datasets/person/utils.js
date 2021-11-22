import { SOURCE } from './const';

export const checkSource = (data) => {
  const source = Object.values(SOURCE).find((item) => new RegExp(item.title).test(data.source));
  return source.translation;
};
