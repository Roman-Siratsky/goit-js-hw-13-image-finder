import './styles.css';
import _ from 'lodash';
import pictureService from './components/fetchPictures';
import refs from './components/refs';
import createMarkup from './components/createMarkup'
import * as basicLightbox from 'basiclightbox';
import notification from './components/notification';


refs.galleryRef.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
        pictureService.fetchPictures().then(mainData => {
            console.log(event.target.src);
        const instance = basicLightbox.create(`
            <img src='${event.target.src}' width="800" height="600">
        `)
        instance.show();
    })
    }
})

const debouncedInputCallback = _.debounce((event) => {
    pictureService.query = event.target.value;
    pictureService.resetPage();
    refs.loadMoreRef.classList.add('is-hidden')
    if (pictureService.query !== '') {
        refs.galleryRef.innerHTML = '';
        pictureService.fetchPictures().then(mainData => {
            if (mainData.length === 0) {
                notification.notify();
            } else {
                createMarkup(mainData);
                refs.loadMoreRef.classList.remove('is-hidden')
            }
        })
    } else {
        refs.galleryRef.innerHTML = ''
    }
}, 400)

// refs.loadMoreRef.addEventListener('click', loadMoreClick)

const loadMoreClick = () => {
    
    refs.loadMoreRef.disabled = true;
    refs.labelRef.textContent = 'Loading';
    refs.spinnerRef.classList.remove('is-hidden')

    pictureService.fetchPictures().then(mainData => {
        createMarkup(mainData);

        window.scrollTo({
            top: 1000000,
            behavior: 'smooth'
        })
        refs.loadMoreRef.disabled = false;
        refs.labelRef.textContent = 'Load more';
    }).finally(() => {
        refs.spinnerRef.classList.add('is-hidden')
    });
}

refs.loadMoreRef.addEventListener('click', loadMoreClick);

refs.inputRef.addEventListener('submit', (event) => {
    event.preventDefault();
})
refs.inputRef.addEventListener('input', (event) => {
    debouncedInputCallback(event);
});




// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ