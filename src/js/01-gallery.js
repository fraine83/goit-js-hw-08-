import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';

const galleryList = document.querySelector(".gallery");

const createGallery = (el) => {
    return el.map (({ preview, original, description}) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
       <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
 </li>`
 ;      
    })
    .join('');
}
const photosMarkup = createGallery(galleryItems);
galleryList.insertAdjacentHTML("beforeend", photosMarkup);

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250
    });
});