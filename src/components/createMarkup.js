import picturesTemplates from '../templates/pictureTemplate.hbs';
import refs from './refs';

const createMarkup = (images) => {
    const markup = picturesTemplates(images);
    refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}




export default createMarkup;