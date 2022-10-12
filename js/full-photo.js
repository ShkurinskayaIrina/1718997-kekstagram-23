import { isEscEvent } from './utils/utils.js';
import { MAX_COMMENTS_COUNT } from './const.js';

let commentsCountRender;
let commentsCurrentPhoto;

const body = document.querySelector('body');

const bigPicture = document.querySelector('.big-picture');
const descriptionBlock = bigPicture.querySelector('.social__caption');

const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

const commentsBlock = document.querySelector('.social__comments');

const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('.social__comment');

const showComment = ({ avatar, name, message }) => {
  const commentSimilar = commentTemplate.cloneNode(true);
  commentSimilar.querySelector('.social__picture').src = avatar;
  commentSimilar.querySelector('.social__picture').alt = name;
  commentSimilar.querySelector('.social__text').textContent = message;

  return commentSimilar;
};

const showCommentsList = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  if (comments.length === 0) {
    commentsBlock.classList.add('hidden');
    return;
  }

  commentsBlock.classList.remove('hidden');

  comments.forEach((comment) => {
    commentsListFragment.appendChild(showComment(comment));
  });

  commentsBlock.appendChild(commentsListFragment);
};

const onCommentsLoaderButton = () => {
  const commentsStartRender = commentsCountRender;

  if (commentsCountRender + MAX_COMMENTS_COUNT > commentsCurrentPhoto.length) {
    commentsCountRender = commentsCurrentPhoto.length;
  } else {
    commentsCountRender = Math.min(commentsCurrentPhoto.length, commentsCountRender + MAX_COMMENTS_COUNT);
  }

  const commentsListForRender = commentsCurrentPhoto.slice(commentsStartRender, commentsCountRender);

  showCommentsList(commentsListForRender);

  bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountRender} из `;

  if (commentsCurrentPhoto.length === commentsCountRender) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderButton);
  }
};

export const showFullPhoto = ({ url, likes, comments, description } ) => {
  commentsCurrentPhoto = comments;
  commentsCountRender = 0;

  const commentsList = document.querySelectorAll('.social__comment');
  commentsList.forEach((element) => element.remove());

  commentsCountRender = Math.min(comments.length, commentsCountRender + MAX_COMMENTS_COUNT);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').children[0].src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-count').firstChild.textContent = `${commentsCountRender} из `;

  bigPicture.querySelector('.comments-count').textContent = comments.length;

  descriptionBlock.textContent = description;

  showCommentsList(comments.slice(0, commentsCountRender));

  if (commentsCountRender === comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderButton);
  } else {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', onCommentsLoaderButton);
  }


  body.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      commentsLoaderButton.removeEventListener('click', onCommentsLoaderButton);
    }
  });
};

bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButton);
});


