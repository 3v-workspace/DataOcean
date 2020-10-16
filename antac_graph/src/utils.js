import $ from 'jquery';

export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function waitElementAndClick(selector) {
  const interval = setInterval(() => {
    const element = $(selector);
    if (element.length) {
      clearInterval(interval);
      element[0].dispatchEvent(new MouseEvent('click'));
    }
  }, 100);
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
