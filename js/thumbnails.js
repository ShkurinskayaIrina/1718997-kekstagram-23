import { showFullPhoto } from './full-photo.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photosFragment = document.createDocumentFragment();

const addThumbnailClickHandler = function (photo) {
  showFullPhoto(photo);
};

const clearContainer = () => {
  const pictures = picturesList.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

export const renderThumbnail = (photos) => {
  photos
    .slice()
    .forEach((photo) => {
      const {url, comments,  likes} = photo; //id
      const pictureElement = pictureTemplate.cloneNode(true);
      const pictureImg = pictureElement.querySelector('.picture__img');
      pictureImg.src = url;
      // pictureElement.querySelector('.picture__img').dataset.image = id;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;

      photosFragment.appendChild(pictureElement);
      pictureElement.addEventListener('click', () => {addThumbnailClickHandler(photo);});
    });

  clearContainer();
  picturesList.appendChild(photosFragment);

  const filterBlock = document.querySelector('.img-filters');
  filterBlock.classList.remove('img-filters--inactive');
};


