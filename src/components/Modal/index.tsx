import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import './Modal.css'

interface Props {
  defaultIsOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

function Modal({ defaultIsOpen, onClose, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseClick = useCallback(() => {
    setIsOpen(false);
    if (onClose) onClose();
  }, [isOpen]);

  const modalClass = useMemo(() => defaultIsOpen || isOpen ? '--show' : '--hide', [isOpen, defaultIsOpen])

  return (
    <div className={`modal-container ${modalClass}`}>
      <div className="inner-modal-container">
        <button className="close-button" onClick={handleCloseClick}>X</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;
