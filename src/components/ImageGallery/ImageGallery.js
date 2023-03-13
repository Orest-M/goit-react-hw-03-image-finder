import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './imageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images &&
        images.map(({ id, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            openModal={openModal}
            id={id}
          />
        ))}
    </ul>
  );
};

export default ImageGallery;
