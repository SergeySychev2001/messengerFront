import React from "react";
import '../styles/ChatInput.scss';

const ChatInput: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:4000/api/users/user/avatar/${sessionStorage.getItem('userId')}`, {
            method: 'GET'
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return(
        <div className="chat__input">
            <form onSubmit={handleSubmit} className="input__form">
                <input type="text" placeholder="Введите сообщение"/>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}

export default ChatInput;