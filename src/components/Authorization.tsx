import React from "react";
import { useState } from "react";
import {Link, withRouter} from 'react-router-dom';
import '../styles/Authorization.scss';

type AuthorizationProps = {
    history: any;
}

const Authorization: React.FC<AuthorizationProps> = ({history}) => {

    const [error, setError] = useState<any>(null);

    const handleSubmit = (e: React.SyntheticEvent): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            login: {value: string},
            password: {value: string}
        }
        if(target.login.value === '' || target.password.value === ''){
            setError(<span style={{color: 'red'}}>Неверный логин или пароль</span>);
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
                    setError(<span style={{color: 'red'}}>{resData}</span>);
                }
                if(res.status === 500){
                    setError(<span style={{color: 'red'}}>{resData}</span>);
                }
                if(res.status === 200){
                    sessionStorage.setItem('userId', resData.userId);
                    sessionStorage.setItem('token', resData.token);
                    history.push('/account');
                }
            })
            .catch(err => console.log(err));
        }
    }

    return(
        <div className="authorization">
            <form onSubmit={handleSubmit} className="authorization__form">
                <input name="login" className="form__input" type="text" placeholder="Логин"/>
                <input name="password" className="form__input" type="password" placeholder="Пароль" />
                {error}
                <input className="form__submit" type="submit" value="Войти" />
                <Link className="form__reg-btn" to="/registration">Зарегистрироваться</Link>
            </form>
        </div>
    )
}

export default withRouter(Authorization);