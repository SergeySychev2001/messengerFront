import React from "react";
import '../styles/SubscribtionsItem.scss';
import avatarImg from '../image/avatar.gif';
import { useState } from "react";
import { SubscribtionsUserModal } from './index';

type SubscribtionsItemProps = {
    id: string
    avatar: boolean
    name: string
    surname: string
    day: number
    month: string
    year: number
    city: string,
    isAll?: boolean
}

const SubscribtionsItem: React.FC<SubscribtionsItemProps> = ({
    id,
    avatar,
    name,
    surname,
    year,
    month,
    day,
    city,
    isAll
}) => {

    const [userModal, setUserModal] = useState<boolean>(false);

    const avatarSource: string = avatar ? `http://127.0.0.1:4000/api/users/user/avatar/${id}` : avatarImg;
    const userName = `${surname} ${name}`;
    return(
        <>
            {userModal ? 
                <SubscribtionsUserModal id={id}
                                        avatar={avatarSource} 
                                        name={name}
                                        surname={surname}
                                        city={city}
                                        day={day}
                                        month={month}
                                        year={year}
                                        closeModal={() => setUserModal(false)}
                                        isAll={isAll}/> 
                : null}
            <div onClick={() => setUserModal(true)} className="subscribtions-item">
                <img className="item__img" src={avatarSource} alt="Аватарка" />
                <span className="item__name">{userName.length > 9 ? userName.slice(0, 9) + '...' : userName}</span>
            </div>
        </>
    )
}

export default SubscribtionsItem;