import React, { ReactEventHandler, useState } from "react";
import { useEffect } from "react";
import '../styles/UserEditModal.scss';
import closeBtn from '../image/close-btn.svg';
import { useTypedSelector } from "../hooks/useTypedSelector";
import {Modal} from './common/index';
import { useActions } from "../hooks/useActions";

type UserEditModalContainerProps = {
    modal: () => void;
}

const UserEditModalContainer: React.FC<UserEditModalContainerProps> = ({
    modal
}) => {
    const { userData } = useTypedSelector(state => state.user);
    const { notificationsListItemIsAdded, userIsLoaded } = useActions();
    const [dayState, setDayState] = useState<number>(userData ? userData.day : 0);
    const [monthState, setMonthState] = useState<number>(userData ? userData.month : 0);
    const [errorModal, setErrorModal] = useState<string | null>(null);

    useEffect(() => {
        const html: HTMLHtmlElement | null = document.querySelector('html');
        if(html) html.style.overflow = 'hidden';
        return () => {
            if(html) html.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = (e: React.SyntheticEvent) : void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: {value: string};
            surname: {value: string};
            day: {value: number};
            month: {value: number};
            year: {value: number};
            city: {value: string};
        }
        const body = {
            name: target.name.value,
            surname: target.surname.value,
            day: target.day.value,
            month: target.month.value,
            year: target.year.value,
            city: target.city.value === 'Не указано' ? null : target.city.value
        }

        if(!body.name || !body.surname || !body.year) {
            setErrorModal('Заполните все поля')
        } else {
            fetch(`http://127.0.0.1:4000/api/users/user/edit/data/${userData?.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then( async (res) => {
                const response = await res.json();
                notificationsListItemIsAdded('Данные успешно обновлены');
                modal();
                userIsLoaded(response);
            })
            .catch(err => {
                notificationsListItemIsAdded('Ошибка соединения');
                modal();
            });
        };
        
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as typeof e.target & {
            value: string
            getAttribute: (value: string) => string
        }
        switch(target.getAttribute('name')){
            case 'day': setDayState(+target.value);
                break;
            case 'month': setMonthState(+target.value);
                break;
        }
    }

    return(
        <>
            {errorModal ? <Modal text={errorModal} exitModal={() => setErrorModal(null)}/> : null}
            <UserEditModal
                name={userData ? userData.name : 'Не указано'}
                surname={userData ? userData.surname : 'Не указано'}
                day={dayState}
                month={monthState}
                year={userData ? userData.year : 1978}
                city={userData ? userData.city ? userData.city : 'Не указано' : 'Не указано'}
                modal={modal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </>
    )
}

type UserEditModalProps = {
    name: string;
    surname: string;
    day: number;
    month: number;
    year: number;
    city: string;
    modal: () => void;
    handleSubmit: ReactEventHandler;
    handleChange: ReactEventHandler;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
    modal,
    handleSubmit,
    handleChange,
    name,
    surname,
    day,
    month,
    year,
    city
}) => {
    return(
        <div className="user-edit-modal">
            <form onSubmit={handleSubmit} className="user-edit-modal__container">
            <img src={closeBtn} onClick={modal} alt="Закрыть" className="user-edit-modal__close"/>
                <div className="user-edit-modal__block">
                    <span>Имя</span>
                    <input type="text" name='name' defaultValue={name}/>
                </div>
                <div className="user-edit-modal__block">
                    <span>Фамилия</span>
                    <input type="text" name='surname' defaultValue={surname}/>
                </div>
                <div className="user-edit-modal__block">
                    <span>Дата рождения</span>
                    <div className="block__date">
                        <select defaultValue={day} onChange={handleChange} name="day">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select defaultValue={month} onChange={handleChange} name="month">
                            <option value="0">Январь</option>
                            <option value="1">Февраль</option>
                            <option value="2">Март</option>
                            <option value="3">Апрель</option>
                            <option value="4">Май</option>
                            <option value="5">Июнь</option>
                            <option value="6">Июль</option>
                            <option value="7">Август</option>
                            <option value="8">Сентябрь</option>
                            <option value="9">Октябрь</option>
                            <option value="10">Ноябрь</option>
                            <option value="11">Декабрь</option>
                        </select>
                        <input type="text" name='year' defaultValue={year}/>
                    </div>
                </div>
                <div className="user-edit-modal__block">
                    <span>Город</span>
                    <input type="text" name='city' defaultValue={city}/>
                </div>
                <input className='user-edit-modal__submit' value='Редактировать' type="submit" />
            </form>
        </div>
    )
}

export default UserEditModalContainer;