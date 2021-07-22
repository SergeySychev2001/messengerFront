import { Dispatch } from 'react';
import { UserIsFetchType, UserIsLoadedType, UserIsRemovedType, UserIsFailedType, UserType } from '../types/user';

const userIsFetch = (): UserIsFetchType => {
    return {
        type: 'USER_IS_FETCH',
        payload: {
            id: 'Загрузка',
            name:'Загрузка',
            surname: 'Загрузка',
            avatar: false,
            day: 0,
            month: 0,
            year: 0,
            city: 'Загрузка',
            error: null,
            loading: true
        }
    }
}

const userIsLoaded = (userData: UserType): UserIsLoadedType => {
    return {
        type: 'USER_IS_LOADED',
        payload: {
            id: userData.id,
            name: userData.name,
            surname: userData.surname,
            avatar: userData.avatar,
            day: userData.day,
            month: userData.month,
            year: userData.year,
            city: userData.city,
            error: null,
            loading: false
        }
    }
}

const userIsRemoved = (): UserIsRemovedType => {
    return {
        type: 'USER_IS_REMOVED',
        payload: {
            id: null,
            name: null,
            surname: null,
            avatar: false,
            day: null,
            month: null,
            year: null,
            city: null,
            error: null,
            loading: false
        }
    }
}

const userIsFailed = (error: string): UserIsFailedType => {
    return {
        type: 'USER_IS_FAILED',
        payload: {
            id: null,
            name: null,
            surname: null,
            avatar: false,
            day: null,
            month: null,
            year: null,
            city: null,
            error: error,
            loading: false
        }
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
                const date = new Date(response.year);
                dispatch(userIsLoaded({
                    id: response.id,
                    name: response.name,
                    surname: response.surname,
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate(),
                    city: response.city,
                    avatar: response.avatar,
                    error: null,
                    loading: false
                }))
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

export {
    userIsFetch,
    userIsLoaded,
    userIsRemoved,
    userIsFailed,
    fetchUser
}