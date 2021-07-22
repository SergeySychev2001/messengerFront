import React, { ReactEventHandler } from "react";
import '../styles/SubscribtionsUserModal.scss';
import closeBtn from '../image/close-btn.svg';
import { Modal } from './common/index';
import { useState } from "react";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { UserType } from "../redux/types/subscriptions";

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
    const {subscribtionsListIsLoaded} = useActions();
    const [errModal, setErrModal] = useState<string | null>(null);
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
    }

    return(
        <>
            {errModal ? <Modal text={errModal} exitModal={() => setErrModal(null)}/> : null}
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
                <form onSubmit={handleSubmit}>
                    <button className="subscribtions-user-modal__edit"
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