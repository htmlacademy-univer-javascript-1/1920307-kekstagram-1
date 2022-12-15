const isEscapeKey = (evt) => evt.key === 'Escape';

const checkLength = (array, maxLenght) => array.length <= maxLenght;

const checkElementUniqueness = (array) => new Set(array).size === array.length;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { checkLength, checkElementUniqueness, isEscapeKey, debounce };
