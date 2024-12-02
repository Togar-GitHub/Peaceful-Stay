import drm from './DeleteReviewModal.module.css';

function DeleteReviewModal({ onClose, onConfirm }) {

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className={drm.modalOverlay}
      onClick={handleOverlayClick}
    >
      <div className={drm.modalContent}>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to delete this Review?</h2>
        <div className={drm.buttonContainer}>
          <button onClick={onConfirm} className={drm.confirmButton}>Yes (Delete Review)</button>
          <button onClick={onClose} className={drm.cancelButton}>No (Keep Review)</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReviewModal;