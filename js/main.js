const COMMENT_OPTIONS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME_OPTIONS = [
  'Филимон',
  'Никита',
  'Сёма',
  'Алиса',
  'Аноним',
  'Умник2012',
  'Артём',
  'Игорь',
  'Костя',
  'Малинка',
  'Генадий',
  'Кекс',
  'Ваня',
  'Петя'
];

const DESCRIPTION_OPTIONS = [
  'Отдыхаю на море',
  'Отдыхаю во дворе',
  'Отдыхаю на районе',
  'Моя мама',
  'Моя семья',
  'Мои лучшие друзья',
  'Гуляем по зоопарку',
  'Сдаём ЕГЭ',
  'Сдали ЕГЭ',
  'Не сдали ЕГЭ'
];

const PICTURES_NUMBER = 25;
const MAX_COMMENT_ID = 1000;

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

const commentsId = [];

function generateCommentId() {
  let newId = 0;
  do {
    newId = getRandomIntNumber(1, MAX_COMMENT_ID);
  } while (Array.prototype.indexOf(commentsId, newId) !== -1);
  commentsId.push(newId);
  return newId;
}

function createComment () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar${getRandomIntNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENT_OPTIONS),
    name: getRandomArrayElement(NAME_OPTIONS)
  };
}

function createPicture (index) {
  const commentsCount = getRandomIntNumber(2, 5);
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_OPTIONS),
    likes: getRandomIntNumber(15, 200),
    comments: Array.from({length: commentsCount}, createComment)
  };
}

const pictures = Array.from({length: PICTURES_NUMBER}, ( cur, i ) => createPicture(i));

// вызовы-"заглушки"
checkLength();
pictures();
