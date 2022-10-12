/* eslint-disable no-console */
import { getRandomInt } from './utils/utils.js';
import { renderThumbnail } from './thumbnails.js';
import { FilterType } from './const.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFiltersSection = document.querySelector('.img-filters');
// const filterDefaultButton = document.querySelector('#filter-default');
// const filterRandomButton = document.querySelector('#filter-random');
// const filterDiscussedButton = document.querySelector('#filter-discussed');

export const getSortData = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const makeUniqueRandomPhoto = (elements) => {
  const previousValues = [];
  return () => {
    let numberCurrentPhoto = getRandomInt(0, elements.length-1);
    while (previousValues.includes(numberCurrentPhoto)) {
      numberCurrentPhoto = getRandomInt(0, elements.length-1);
    }

    previousValues.push(numberCurrentPhoto);

    return  elements[numberCurrentPhoto];
  };
};

export const getRandomPhotos = (photos) => {
  const getUniqueRandomPhoto = makeUniqueRandomPhoto(photos);

  return new Array(RANDOM_PHOTOS_COUNT).fill(null).map(()=>getUniqueRandomPhoto());
};

export const setFilterSectionClick = (data) => {
  const changeFilterHanler = (evt) => {
    if (evt.target && evt.target.matches('button')) {
      const filtersButtons = document.querySelectorAll('.img-filters__button');
      filtersButtons.forEach((element) => element.classList.remove('img-filters__button--active'));

      evt.target.classList.add('img-filters__button--active');
    }

    if (evt.target.id === FilterType.Default) {
      renderThumbnail(data);
    }

    if (evt.target.id === FilterType.Random) {
      renderThumbnail(getRandomPhotos(data));
    }

    if (evt.target.id === FilterType.Discussed) {
      renderThumbnail(data.slice().sort(getSortData));
    }
  };

  imgFiltersSection.addEventListener('click', debounce(changeFilterHanler, RERENDER_DELAY));
};
