import React from "react";
import { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Modal } from "./common";
import '../styles/Registration.scss';
import leftArrow from '../image/left-arrow.svg';

type RegistrationProps = {
    history: any;
}

const Registration: React.FC<RegistrationProps> = ({history}) => {

    const [errorModal, setErrorModal] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<object>({});

    const handleSubmit = (e: React.SyntheticEvent) : void => {

        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: {value: string};
            surname: {value: string};
            email: {value: string};
            year: {value: string};
            month: {value: string};
            day: {value: string};
            login: {value: string};
            password: {value: string};
            repeatPassword: {value: string};
        };
        if( target.name.value === '' ||
            target.surname.value === '' ||
            target.email.value === '' ||
            target.year.value === '' ||
            target.login.value === '' ||
            target.password.value === '' ||
            target.repeatPassword.value === '' ||
            target.name.value === ''){
                setErrorModal(true);
        } else {
            setErrorModal(false);
            if(target.password.value === target.repeatPassword.value){
                setPasswordError({});
                const body: object = {
                    name: target.name.value,
                    surname: target.surname.value,
                    email: target.email.value,
                    year: target.year.value,
                    month: target.month.value,
                    day: target.day.value,
                    login: target.login.value,
                    password: target.password.value
                }
                fetch('http://127.0.0.1:4000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(res => history.push('/authorization'))
                .catch(err => console.log(err.json()));
            } else {
                setPasswordError({
                    border: '2px solid red'
                });
            }
        }   
        
    }

    const modal: any = errorModal ? <Modal exitModal={() => setErrorModal(false)} text="Пожалуйста, заполните все поля"/> : null;

    return(
        <div className="registration">
            <div className="registration__exit">
                <Link to="/authorization">
                <img src={leftArrow} alt="<--" />
                <span>Вернуться</span>
                </Link>
            </div>
            {modal}
            <form onSubmit={handleSubmit} className="registration__form">
                <input name="name" className="form__input" type="text" placeholder="Имя"/>
                <input name="surname" className="form__input" type="text" placeholder="Фамилия"/>
                <input name="email" className="form__input" type="text" placeholder="Электронная почта"/>
                <div className="form__date_of_birth">
                    <select name="day" className="form__input">
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
                    <select name="month" className="form__input">
                        <option value="1">Январь</option>
                        <option value="2">Февраль</option>
                        <option value="3">Март</option>
                        <option value="4">Апрель</option>
                        <option value="5">Май</option>
                        <option value="6">Июнь</option>
                        <option value="7">Июль</option>
                        <option value="8">Август</option>
                        <option value="9">Сентябрь</option>
                        <option value="10">Октябрь</option>
                        <option value="11">Ноябрь</option>
                        <option value="12">Декабрь</option>
                    </select>
                    <input name="year" className="form__input" type="text" placeholder="Год рождения"/>
                </div>
                <input name="login" className="form__input" type="text" placeholder="Логин"/>
                <input name="password" className="form__input" type="password" placeholder="Пароль"/>
                <input name="repeatPassword" className="form__input" style={passwordError} type="password" placeholder="Повторите пароль"/>
                <input className="form__submit" type="submit" value="Зарегистрироваться"/>
            </form>
        </div>
    )
}

export default withRouter(Registration); 