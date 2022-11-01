function getRandomIntNumber (min, max) {
  if (min > max) {
    const intermediary = min;
    min = max;
    max = intermediary;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function checkLength (string, maxLenght) {
  return string.length <= maxLenght;
}

function getRandomArrayElement (elements) {
  return elements[getRandomIntNumber(0, elements.length - 1)];
}

export {getRandomIntNumber, getRandomArrayElement, checkLength};

