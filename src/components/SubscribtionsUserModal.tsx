import React, { ReactEventHandler } from "react";
import '../styles/SubscribtionsUserModal.scss';
import closeBtn from '../image/close-btn.svg';
import { Modal } from './common/index';
import { useState } from "react";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { UserType } from "../redux/types/subscriptions";
import { MessageModal } from './index';

type SubscribtionsUserModalContainerProps = {
    id: string,
    avatar: string
    name: string
    surname: string
    day: number
    month: string
    year: number
    city: string
    closeModal: () => void,
    isAll?: boolean
}
const SubscribtionsUserModalContainer: React.FC<SubscribtionsUserModalContainerProps> = ({
    id,
    avatar,
    name,
    surname,
    year,
    month,
    day,
    city,
    closeModal,
    isAll
}) => {
    const {subscribtionsList} = useTypedSelector(state => state.subscriptions);
    const {list} = subscribtionsList;
    const {
        subscribtionsListIsLoaded,
        notificationsListItemIsAdded
    } = useActions();
    const [errModal, setErrModal] = useState<string | null>(null);
    const [messageModal, setMessageModal] = useState<boolean>(false);
    const [submitBtn, setSubmitBtn] = useState<string>('Загрузка');

    useEffect(() => {
        fetch('http://127.0.0.1:4000/api/subscribtions/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstUserId: sessionStorage.getItem('userId'),
                secondUserId: id
            })
        })
        .then( async (res) => {
            const response = await res.json();
            if(res.status === 200){
                if(response === 'Найдено') setSubmitBtn('Отписаться');
                if(response === 'Не найдено') setSubmitBtn('Подписаться'); 
            }
        })
        .catch(err => {
            setErrModal('Ошибка соединения');
            setSubmitBtn('Ошибка');
        })
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: string
        }
        switch(target.name){
            case 'subscribe': {
                if(submitBtn === 'Подписаться'){
                    fetch('http://127.0.0.1:4000/api/subscribtions/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstUserId: sessionStorage.getItem('userId'),
                            secondUserId: id
                        })
                    })
                    .then( async (res) => {
                        const response: string = await res.json();
                        if (res.status === 200) {
                            notificationsListItemIsAdded(`Вы подписались на пользователя ${surname} ${name}`);
                            setSubmitBtn('Отписаться'); 
                        }
                        if (res.status === 500) {
                            setErrModal(response)
                        }
                    })
                    .catch(err => setErrModal('Ошибка соединения'));
                }
                if (submitBtn === 'Отписаться'){
                    fetch('http://127.0.0.1:4000/api/subscribtions/delete', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstUserId: sessionStorage.getItem('userId'),
                            secondUserId: id
                        })
                    })
                    .then(async (res) => {
                        const response: string = await res.json();
                        if (res.status === 200) {
                            notificationsListItemIsAdded(`Вы отписались от пользователя ${surname} ${name}`);
                            if(!isAll){
                                const newList: UserType[] | null = list
                                ? list.filter(({id}) => id !== response)
                                : null;
                                if(newList){
                                    if(newList.length > 0){
                                        subscribtionsListIsLoaded(newList);
                                    } else {
                                        subscribtionsListIsLoaded(null);
                                    }
                                }
                            } else {
                                setSubmitBtn('Подписаться');
                            }
                        }
                        if (res.status === 500) {
                            setErrModal(response)
                        }
                    })
                    .catch(err => setErrModal('Ошибка соединения'))
                }
                return null;
            }
            case 'sendMessage': {
                setMessageModal(true);
                return null;
            }
            default: return null;
        }
        
    }

    return(
        <>
            {errModal ? <Modal text={errModal} exitModal={() => setErrModal(null)}/> : null}
            {messageModal ? <MessageModal id={id} name={name} surname={surname} exitModal={() => setMessageModal(false)}/> : null}
            <SubscribtionsUserModal avatar={avatar}
                                name={name}
                                surname={surname}
                                year={year}
                                month={month}
                                day={day}
                                city={city ? city : 'Не указано'}
                                closeModal={closeModal}
                                handleSubmit = {handleSubmit}
                                submitBtn = {submitBtn}/>
        </>  
    )
}

type SubscribtionsUserModalType = {
    avatar: string
    name: string
    surname: string
    day: number
    month: string
    year: number
    city: string,
    submitBtn: string,
    closeModal: () => void,
    handleSubmit: ReactEventHandler
}

const SubscribtionsUserModal: React.FC<SubscribtionsUserModalType> = ({
    avatar,
    name,
    surname,
    year,
    month,
    day,
    city,
    submitBtn,
    closeModal,
    handleSubmit
}) => {
    return(
        <div className="subscribtions-user-modal">
            <div className="subscribtions-user-modal__container">
                <img className="subscribtions-user-modal__close" onClick={closeModal} src={closeBtn} alt="Закрыть" />
                <div className="subscribtions-user-modal__avatar">
                    <img src={avatar} alt="Аватарка" />
                </div>
                <div className="subscribtions-user-modal__data">
                    <div className="data__item">{name}</div>
                    <div className="data__item">{surname}</div>
                    <div className="data__item">{day} {month} {year}</div>
                    <div className="data__item">{city}</div>
                </div>
                <form className="subscribtions-user-modal__form">
                    <button onClick={handleSubmit} name="sendMessage" className="subscribtions-user-modal__btn">
                        Отправить сообщение
                    </button>
                    <button onClick={handleSubmit} name="subscribe" 
                            className="subscribtions-user-modal__btn"
                            style={ submitBtn === 'Загрузка' ? {backgroundColor: 'green'} 
                                    : submitBtn === 'Подписаться' ? {backgroundColor: 'blue'}
                                    : submitBtn === 'Отписаться' ? {backgroundColor: 'red'}
                                    : {backgroundColor: 'gray'}}>{submitBtn}</button>
                </form>
            </div>
        </div>
    )
}

export default SubscribtionsUserModalContainer;