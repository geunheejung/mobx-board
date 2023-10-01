import {ReactNode} from "react";

interface Props {
  children: ReactNode
}

function Modal({ children }: Props) {
  return (
    <div className="modal-container">
      <div className="inner-modal-container">
      {children}
      </div>
    </div>
  )
}

export default Modal;
