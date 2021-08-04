import React from 'react';
import '../styles/MessageModal.scss';
import closeBtn from '../image/close-btn.svg';
import { ReactEventHandler } from 'react';
import { useActions } from '../hooks/useActions';

type MessageModalContainerType = {
    exitModal: () => void,
    id: string,
    name: string,
    surname: string
}

const MessageModalContainer: React.FC<MessageModalContainerType> = ({
    exitModal,
    id,
    name,
    surname
}) => {
    const { notificationsListItemIsAdded } = useActions();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            body: {
                value: string
            }
        }
        fetch('http://localhost:4000/api/messages/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: target.body.value,
                firstUserId: sessionStorage.getItem('userId'),
                secondUserId: id
            })
        })
        .then((res) => {
            if(res.status === 200){
                notificationsListItemIsAdded('Сообщение отправлено');
                exitModal();
            }
            if(res.status === 500){
                notificationsListItemIsAdded('Сообщение не отправлено');
                exitModal();
            }
        })
        .catch(err => {
            notificationsListItemIsAdded('Сообщение не отправлено');
            exitModal();
        });
    }
    return(
        <MessageModal exitModal={exitModal} handleSubmit={handleSubmit}/>
    )
}

type MessageModalType = {
    handleSubmit: ReactEventHandler
    exitModal: () => void
}

const MessageModal: React.FC<MessageModalType> = ({
    exitModal,
    handleSubmit
}) => {
    return(
        <div className="message-modal">
            <div className="message-modal__container">
                <img className="message-modal__close" onClick={() => exitModal()} src={closeBtn} alt="Закрыть"/>
                <form onSubmit={handleSubmit} className="message-modal__form">
                    <textarea name="body" className="form__body" placeholder='Введите текст...'></textarea>
                    <input className="form__submit" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default MessageModalContainer;