import { useModal } from '../../context/Modal';
import './OpenModalMenu.css';

function OpenModalMenuItem({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li 
      className='item'
      onClick={onClick}>{itemText}
    </li>
  );
}

export default OpenModalMenuItem;