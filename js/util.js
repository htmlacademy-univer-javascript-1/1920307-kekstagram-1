function getRandomIntNumber (min, max) {
  if (min > max) {
    const intermediary = min;
    min = max;
    max = intermediary;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomArrayElement (elements) {
  return elements[getRandomIntNumber(0, elements.length - 1)];
}

function checkLength (array, maxLenght) {
  return array.length <= maxLenght;
}

function checkElementUniqueness (array) {
  return new Set(array).size === array.length;
}

export {getRandomIntNumber, getRandomArrayElement, checkLength, checkElementUniqueness};

