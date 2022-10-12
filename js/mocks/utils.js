import { DESCRIPTION, COMMENTS, NAMES, SIMILAR_PHOTOS_COUNT } from '../mocks/data.js';

let idComment = 0;
let idSimilarPhoto = 0;

export const getRandomInt = function (param1, param2) {
  let minRange = Math.abs(param1);
  let maxRange = Math.abs(param2);

  if (minRange > maxRange) {
    [minRange, maxRange] = [maxRange, minRange];
  }

  return Math.floor(Math.random()*(maxRange-minRange+1))+minRange;
};

export const isValidLength = function (textControl, maxLength) {
  return maxLength >= textControl.length;
};

const getMessage = function() {
  return new Array(getRandomInt(1,2)).fill(null)
    .map(()=>COMMENTS[getRandomInt(0,5)]).join('.');
};

const createComment = function() {
  return {
    id: idComment++, //уникальный
    avatar: `/img/avatar-${getRandomInt(1,6)}.svg`,
    message: getMessage(),
    name: NAMES[getRandomInt(0,9)],
  };
};

const createSimilarComments = function() {
  const commentsCount = getRandomInt(0,5);
  return new Array(commentsCount).fill(null).map(()=>createComment());
};

// const makeUniqueRandomPhoto = (min, max) => {
//   const previousValues = [];
//   return () => {
//     let currentPhoto = getRandomInt(min, max);
//     while (previousValues.includes(currentPhoto)) {
//       currentPhoto = getRandomInt(min, max);
//     }

//     previousValues.push(currentPhoto);
//     return `/photos/${currentPhoto}.jpg`;
//   };
// };

const previousValues = [];
const getRandomPhoto = function(min, max) {
  const currentPhoto = getRandomInt(min, max);
  if (previousValues.includes(currentPhoto)) {
    return getRandomPhoto(min, max);
  } else {
    previousValues.push(currentPhoto);
    return `/photos/${currentPhoto}.jpg`;
  }
};

const createSimilarPhoto = function() {
  // const getUniqueRandomPhoto = makeUniqueRandomPhoto(0, SIMILAR_PHOTOS_COUNT);

  return {
    id: idSimilarPhoto++,
    // url: getUniqueRandomPhoto(), //с использованием замыкания
    url: getRandomPhoto(1, SIMILAR_PHOTOS_COUNT), // с использованием рекурсии
    description: DESCRIPTION[getRandomInt(0,9)],
    likes: getRandomInt(15,200),
    comments: createSimilarComments(),
  };
};

export const createSimilarPhotos = () => new Array(SIMILAR_PHOTOS_COUNT).fill(null).map(()=>createSimilarPhoto());
