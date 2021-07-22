import React from "react";
import { useEffect, useState } from "react";
import Months from "../enums/months";
import avatarImg from '../image/avatar.gif';
import { TextBlock } from "./common";
import '../styles/User.scss';
import {useTypedSelector} from '../hooks/useTypedSelector';
import { useActions } from "../hooks/useActions";
import { UserEditModal, UserAvatarEditModal } from './index';

const UserContainer: React.FC = () => {

    const { avatar, city, day, month, name, surname, year, error, loading, id} = useTypedSelector(state => state.user);
    const {fetchUser} = useActions();
    const [userEditModal, setUserEditModal] = useState<boolean>(false);
    const [userAvatarEditModal, setUserAvatarEditModal] = useState<boolean>(false);

    useEffect(() => {
        fetchUser();
    }, []);

    if(loading){
        return <TextBlock text='Загрузка'/>
    }
    if(error){
        return <TextBlock text={error}/>;
    }else{
        return (
            <>
                {userAvatarEditModal ? <UserAvatarEditModal modal={() => setUserAvatarEditModal(false)}/> : null}
                {userEditModal ? <UserEditModal modal={() => setUserEditModal(false)}/> : null}
                <User 
                    avatar={avatar ? `http://127.0.0.1:4000/api/users/user/avatar/${id}` : avatarImg}
                    name={name ? name : 'Не указано'}
                    surname={surname ? surname : 'Не указано'}
                    day={day ? day : 1}
                    month={Months[month ? month : 0]}
                    year={year ? year : 1978}
                    city={city === null ? 'Не указано' : city}
                    userEditModal={() => setUserEditModal(true)}
                    userAvatarEditModal={() => setUserAvatarEditModal(true)}
                />
            </>    
        )
    }
 
}

type UserProps = {
    avatar: string,
    name: string,
    surname: string,
    day: number,
    month: string,
    year: number,
    city: string,
    userEditModal: () => void,
    userAvatarEditModal: () => void,
}

const User: React.FC<UserProps> = ({
    avatar,
    name,
    surname,
    day,
    month,
    year,
    city,
    userEditModal,
    userAvatarEditModal
}) => {
    return(
        <div className="user">
            <div className="user__avatar">
                <img src={avatar} onClick={() => userAvatarEditModal()}  alt="Аватарка" />
            </div>
            <div className="user__data">
                <div className="data__item">{name}</div>
                <div className="data__item">{surname}</div>
                <div className="data__item">{`${day} ${month} ${year}`}</div>
                <div className="data__item">{city}</div>
            </div>
            <button onClick={() => userEditModal()} className="user__edit">Редактировать</button>
        </div>
    )
}

export default UserContainer;