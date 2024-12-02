import dsm from './DeleteSpotModal.module.css';

function DeleteSpotModal({ onClose, onConfirm }) {

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className={dsm.modalOverlay}
      onClick={handleOverlayClick}
    >
      <div className={dsm.modalContent}>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this spot from the listings?</h2>
        <div className={dsm.buttonContainer}>
          <button onClick={onConfirm} className={dsm.confirmButton}>Yes (Delete Spot)</button>
          <button onClick={onClose} className={dsm.cancelButton}>No (Keep Spot)</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSpotModal;