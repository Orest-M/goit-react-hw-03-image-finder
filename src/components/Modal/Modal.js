import css from './modal.module.css';

const Modal = ({ currentImg, closeModal }) => {
  return (
    <div className={css.Overlay} onClick={closeModal} data-overlay>
      <div className={css.Modal}>
        <img src={currentImg[0].largeImageURL} alt="bigPhoto" />
      </div>
    </div>
  );
};

export default Modal;
