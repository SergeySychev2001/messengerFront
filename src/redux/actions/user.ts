import { Dispatch } from 'react';
import { 
    UserIsFetchType, 
    UserIsLoadedType, 
    UserIsFailedType, 
    UserType, 
    UserAvatarIsUpdatedType } from '../types/user';

const userIsFetch = (): UserIsFetchType => {
    return {
        type: 'USER_IS_FETCH'
    }
}

const userIsLoaded = (userData: UserType): UserIsLoadedType => {
    const date = new Date(userData.year);
    const formatedUserData = {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        city: userData.city,
        avatar: userData.avatar
    }
    return {
        type: 'USER_IS_LOADED',
        payload: formatedUserData
    }
}

const userIsFailed = (error: string): UserIsFailedType => {
    return {
        type: 'USER_IS_FAILED',
        error
    }
}

const fetchUser = () => (dispatch: Dispatch<any>) => {
    dispatch(userIsFetch());
    fetch(`http://127.0.0.1:4000/api/users/user/data/${sessionStorage.getItem('userId')}`, {
            method: 'GET'
        })
        .then(async (res) => {
            const response = await res.json();
            if(res.status === 200){
                dispatch(userIsLoaded(response));
            }
            if(res.status === 404){
                dispatch(userIsFailed('Не удалось получить данные'));
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(userIsFailed('Не удалось получить данные'));
        });
}

const userAvatarIsUpdated = (avatar: string): UserAvatarIsUpdatedType => {
    return{
        type: 'USER_AVATAR_IS_UPDATED',
        avatar
    }
}

export {
    userIsFetch,
    userIsLoaded,
    userIsFailed,
    fetchUser,
    userAvatarIsUpdated
}