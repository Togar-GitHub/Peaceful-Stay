import { useModal } from '../../context/Modal';
import omi from './OpenModalMenu.module.css';

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
      className={omi.item}
      onClick={onClick}>{itemText}
    </li>
  );
}

export default OpenModalMenuItem;