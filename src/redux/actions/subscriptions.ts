import { Dispatch } from 'react';
import {SearchListIsFailedType, 
        SearchListIsLoadedType, 
        SearchListIsFetchType, 
        UserType,
        SubscribtionsListIsFetchType,
        SubscribtionsListIsLoadedType,
        SubscribtionsListIsFailedType} from '../types/subscriptions';

const searchListIsFetch = (): SearchListIsFetchType => {
    return{
        type: 'SEARCH_LIST_IS_FETCH'
    }
}

const searchListIsLoaded = (payload: Array<UserType>): SearchListIsLoadedType => {
    return{
        type: 'SEARCH_LIST_IS_LOADED',
        payload
    }
}

const searchListIsFailed = (error: string): SearchListIsFailedType => {
    return{
        type: 'SEARCH_LIST_IS_FAILED',
        error
    }
}

const fetchSearchList = () => (dispatch: Dispatch<any>) => {
    dispatch(searchListIsFetch());
    fetch('http://127.0.0.1:4000/api/users/user/data/')
    .then( async (res) => {
        const data = await res.json();
        if(res.status === 200) {
            dispatch(searchListIsLoaded(data));
        }
        if(res.status === 404) {
            dispatch(searchListIsFailed(data));
        }
    })
    .catch(err => {
        dispatch(searchListIsFailed('Ошибка соединения'))
    })
}

const subscribtionsListIsFetch = (): SubscribtionsListIsFetchType => {
    return{
        type: 'SUBSCRIBTIONS_LIST_IS_FETCH'
    }
}

const subscribtionsListIsLoaded = (payload: Array<UserType> | null): SubscribtionsListIsLoadedType => {
    return{
        type: 'SUBSCRIBTIONS_LIST_IS_LOADED',
        payload
    }
}

const subscribtionsListIsFailed = (error: string): SubscribtionsListIsFailedType => {
    return{
        type: 'SUBSCRIBTIONS_LIST_IS_FAILED',
        error
    }
}

const fetchSubscribtionsList = () => (dispatch: Dispatch<any>) => {
    dispatch(subscribtionsListIsFetch());
    fetch('http://127.0.0.1:4000/api/subscribtions/findall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstUserId: sessionStorage.getItem('userId')})
    })
    .then( async (res) => {
        const data = await res.json();
        if(res.status === 200) {
            dispatch(subscribtionsListIsLoaded(data));
        }
        if(res.status === 404) {
            dispatch(subscribtionsListIsFailed(data));
        }
    })
    .catch(err => {
        dispatch(searchListIsFailed('Ошибка соединения'))
    })
}

export {
    fetchSearchList,
    fetchSubscribtionsList,
    subscribtionsListIsLoaded
}