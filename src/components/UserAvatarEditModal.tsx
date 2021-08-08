import React, { useState } from "react";
import '../styles/UserAvatarEditModal.scss';
import closeBtn from '../image/close-btn.svg';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

type UserAvatarEditModalContainerProps = {
    modal: () => void
}

const UserAvatarEditModalContainer: React.FC<UserAvatarEditModalContainerProps> = ({modal}) => {

    const { userData } = useTypedSelector(state => state.user);
    const { notificationsListItemIsAdded ,userAvatarIsUpdated } = useActions();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            avatar: {files: Array<string>, value: string}
        }
        const formData = new FormData();
        formData.append('avatar', target.avatar.files[0]);
        const fileType = target.avatar.value.split('.').pop();
        if(fileType === 'jpg'){
            fetch(`http://127.0.0.1:4000/api/users/user/edit/avatar/${userData?.id}`, {
                method: 'POST',
                body: formData
            })
            .then( async (res) => {
                const response = await res.json();
                userAvatarIsUpdated(response.avatar);
                notificationsListItemIsAdded('Аватарка успешно обновлена');
                modal();
            })
            .catch(err => {
                notificationsListItemIsAdded('Не удалось обновить аватарку');
                modal();
            });
        } else {
            notificationsListItemIsAdded('Файл должен быть с расширением ".jpg"');
            modal();
        }
        
    }

    return(
        <UserAvatarEditModal handleSubmit={handleSubmit} modal={() => modal()}/>
    )
}

type UserAvatarEditModalProps = {
    modal: () => void,
    handleSubmit: React.FormEventHandler
}

const UserAvatarEditModal: React.FC<UserAvatarEditModalProps> = ({modal, handleSubmit}) => {
    return(
        <div className="user-avatar-edit-modal">
            <form onSubmit={handleSubmit} className='user-avatar-edit-modal__container' encType="multipart/form-data">
                <img src={closeBtn} onClick={() => modal()} alt="Закрыть" className="user-avatar-edit-modal__close"/>
                <span className='user-avatar-edit-modal__title'>Обновить аватарку</span>
                <input className='user-avatar-edit-modal__file' type="file" name="avatar"/>
                <input className='user-avatar-edit-modal__submit' value='Обновить' type="submit" />
            </form>
        </div>
    )
}

export default UserAvatarEditModalContainer;