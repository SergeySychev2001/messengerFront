import React from "react";
import closeBtn from '../../image/close-btn.svg';
import '../../styles/common/Modal.scss';

type ModalProps = {
    text: string;
    exitModal: any;
}

const Modal: React.FC<ModalProps> = ({text, exitModal}) => {
    return(
        <div className="modal">
            <div className="modal__container">
                <img src={closeBtn} onClick={exitModal} alt="Закрыть" className="modal__close"/>
                <span className="modal__text">{text}</span>
            </div>
        </div>
    )
}

export default Modal;