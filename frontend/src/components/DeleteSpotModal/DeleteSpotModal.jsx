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
        <h2>Are you sure you want to delete this spot?</h2>
        <div>
          <button onClick={onClose} className={dsm.cancelButton}>Cancel</button>
          <button onClick={onConfirm} className={dsm.confirmButton}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteSpotModal;