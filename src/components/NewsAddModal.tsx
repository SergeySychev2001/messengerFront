import React from "react";
import '../styles/NewsAddModal.scss'
import closeBtn from '../image/close-btn.svg';
import { ReactEventHandler } from "react";
import { Modal } from './common/index';
import { useState } from "react";
import { useActions } from "../hooks/useActions";

type NewsAddModalContainerProps = {
    exitModal: () => void,
    my?: boolean
}

const NewsAddModalContainer: React.FC<NewsAddModalContainerProps> = ({
    exitModal,
    my
}) => {

    const [errModal, setErrorModal] = useState<string | null>(null);
    const { myNewsListItemIsAdded,
            notificationsListItemIsAdded } = useActions();

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            body: {value: string},
            tags: {value: string}
        }
        if(!target.body.value){
            setErrorModal('Введите текст новости');
            return;
        }
        fetch('http://127.0.0.1:4000/api/news/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                userId: sessionStorage.getItem('userId'),
                body: target.body.value,
                tags: target.tags.value 
            })
        })
        .then( async (res) => {
            const response = await res.json();
            if(res.status === 200){
                notificationsListItemIsAdded('Новость добавлена');
                if(my){
                    console.log(response)
                    myNewsListItemIsAdded(response);
                };
                exitModal();
            }
            if(res.status === 500){
                setErrorModal(response);
            }
        })
        .catch(err => setErrorModal('Ошибка соединения'));
    }

    return(
        <>
            {errModal ? <Modal text={errModal} exitModal={() => setErrorModal(null)}/> : null}
            <NewsAddModal exitModal={exitModal} handleSubmit={handleSubmit}/>
        </>
    )
}

type NewsAddModalProps = {
    exitModal: () => void,
    handleSubmit: ReactEventHandler
}

const NewsAddModal: React.FC<NewsAddModalProps> = ({
    exitModal,
    handleSubmit
}) => {
    return(
        <div className="news-add-modal">
            <div className="news-add-modal__container">
                <img className='news-add-modal__close' onClick={() => exitModal()} src={closeBtn} alt="Закрыть" />
                <form className="news-add-modal__form" onSubmit={handleSubmit}>
                    <textarea name="body" className="form__body" placeholder='Введите текст...'></textarea>
                    <input name="tags" className="form__tags" autoComplete="off" type="text" placeholder='Введите теги через пробел...' />
                    <input className="form__submit" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default NewsAddModalContainer;