import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../styles/Header.scss';

type HeaderProps = {
    history: any
}

const Header: React.FC<HeaderProps> = ({history}) => {

    const logOut = (): void => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        history.push('/');
    }

    return(
        <header className="header">
            <span className="header__title">Messenger</span>
            <nav className="header__nav">
                <ul className="nav__items">
                    <Link className="nav__item nav__item_link" to="/messages">Сообщения</Link>
                    <Link className="nav__item nav__item_link" to="/news">Новости</Link>
                    <Link className="nav__item nav__item_link" to="/subscribtions">Подписки</Link>
                    <Link className="nav__item nav__item_link" to="/account">Аккаунт</Link>
                    <li onClick={logOut} className="nav__item nav__item_exit">Выход</li>
                </ul>
            </nav>
        </header>
    )
}

export default withRouter(Header);