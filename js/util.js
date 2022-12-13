const getRandomIntNumber = (min, max) => {
  if (min > max) {
    const intermediary = min;
    min = max;
    max = intermediary;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (elements) => elements[getRandomIntNumber(0, elements.length - 1)];

const checkLength = (array, maxLenght) => array.length <= maxLenght;

const checkElementUniqueness = (array) => new Set(array).size === array.length;

export {getRandomArrayElement, checkLength, checkElementUniqueness, isEscapeKey};
