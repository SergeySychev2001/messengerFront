import React, { useState } from "react";
import '../styles/UserAvatarEditModal.scss';
import closeBtn from '../image/close-btn.svg';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Modal } from './common/';
import { useHistory } from "react-router";

type UserAvatarEditModalContainerProps = {
    modal: () => void
}

const UserAvatarEditModalContainer: React.FC<UserAvatarEditModalContainerProps> = ({modal}) => {

    const {id} = useTypedSelector(state => state.user);
    const history = useHistory();
    const [errorModal, setErrorModal] = useState<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            avatar: {files: Array<string>, value: string}
        }
        const formData = new FormData();
        formData.append('avatar', target.avatar.files[0]);
        const fileType = target.avatar.value.split('.').pop();
        if(fileType === 'jpg'){
            fetch(`http://127.0.0.1:4000/api/users/user/edit/avatar/${id}`, {
                method: 'POST',
                body: formData
            })
            .then(res => {
                history.go(0);
            })
            .catch(err => {
                console.log(err);
                setErrorModal('Не удалось обновить аватарку');
            });
        } else {
            setErrorModal('Файл должен быть с расширением ".jpg"');
        }
        
    }

    return(
        <>
            {errorModal ? <Modal text={errorModal} exitModal={() => setErrorModal(undefined)}/> : null}
            <UserAvatarEditModal handleSubmit={handleSubmit} modal={() => modal()}/>
        </>
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