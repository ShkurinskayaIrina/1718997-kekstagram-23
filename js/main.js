import  { setFormSubmit, addNewPhoto } from './user-module.js';
import { setUploadFileInput } from './user-module.js';
import { setFilterSectionClick } from './filter.js';
import { getData } from './api.js';
import { renderThumbnail } from './thumbnails.js';
import { showAlert } from './utils/utils.js';
import './preview.js';

getData((photos) => {
  renderThumbnail(photos);
  setFilterSectionClick(photos);
},
() => showAlert()
);

setUploadFileInput();
setFormSubmit(addNewPhoto);
