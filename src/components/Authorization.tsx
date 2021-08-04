import React from "react";
import { useState } from "react";
import {Link, useHistory} from 'react-router-dom';
import { useActions } from "../hooks/useActions";
import '../styles/Authorization.scss';
import { Notifications } from "./common";

const Authorization: React.FC = () => {

    const history = useHistory();
    const { notificationsListItemIsAdded } = useActions();

    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            login: {value: string},
            password: {value: string}
        }
        if(target.login.value === '' || target.password.value === ''){
            notificationsListItemIsAdded('Неверный логин или пароль');
        } else {
            const body = {
                login: target.login.value,
                password: target.password.value
            }
            fetch('http://127.0.0.1:4000/api/users/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then( async (res) => {
                const resData = await res.json();
                if(res.status === 404){
                    notificationsListItemIsAdded(resData);
                }
                if(res.status === 500){
                    notificationsListItemIsAdded(resData);
                }
                if(res.status === 200){
                    sessionStorage.setItem('userId', resData.userId);
                    sessionStorage.setItem('token', resData.token);
                    history.push('/account');
                }
            })
            .catch(err => notificationsListItemIsAdded('Ошибка соединения'));
        }
    }

    return(
        <div className="authorization">
            <Notifications/>
            <form onSubmit={handleSubmit} className="authorization__form">
                <input name="login" autoComplete="false" className="form__input" type="text" placeholder="Логин"/>
                <input name="password" autoComplete="false" className="form__input" type="password" placeholder="Пароль" />
                <input className="form__submit" type="submit" value="Войти" />
                <Link className="form__reg-btn" to="/registration">Зарегистрироваться</Link>
            </form>
        </div>
    )
}

export default Authorization;