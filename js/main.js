function getRandomIntNumber(min, max) {
  if (min > max) {
    const intermediary = min;
    min = max;
    max = intermediary;
  }
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function checkLength(string, maxLenght) {
  return string.length <= maxLenght;
}

getRandomIntNumber();
checkLength();
