import { Dispatch } from 'react';
import { 
    MyNewsListIsFetchType, 
    MyNewsListIsLoadedType, 
    MyNewsListIsFailedType, 
    MyNewsListItemIsDeletedType,
    SubscribtionsNewsListIsFetchType,
    SubscribtionsNewsListIsLoadedType,
    SubscribtionsNewsListIsFailedType,
    FavouritesNewsListIsFetchType,
    FavouritesNewsListIsLoadedType,
    FavouritesNewsListIsFailedType,
    NewType, 
    MyNewsListItemIsAddedType,
    FavouritesNewsListItemIsDeletedType,
    FavouritesNewsListItemIsAddedType
} from '../types/news';

const myNewsListIsFetch = (): MyNewsListIsFetchType => {
    return{
        type: 'MY_NEWS_LIST_IS_FETCH'
    }
}

const myNewsListIsLoaded = (news: Array<NewType>): MyNewsListIsLoadedType => {
    return{
        type: 'MY_NEWS_LIST_IS_LOADED',
        payload: news
    }
}

const myNewsListIsFailed = (error: string): MyNewsListIsFailedType => {
    return{
        type: 'MY_NEWS_LIST_IS_FAILED',
        error
    }
}

const myNewsListItemIsDeleted = (id: string): MyNewsListItemIsDeletedType => {
    return{
        type: 'MY_NEWS_LIST_ITEM_IS_DELETED',
        id
    }
}

const myNewsListItemIsAdded = (newNewsItem: NewType): MyNewsListItemIsAddedType => {
    return{
        type: 'MY_NEWS_LIST_ITEM_IS_ADDED',
        newNewsItem
    }
}

const fetchMyNewsList = () => (dispatch: Dispatch<any>) => {
    dispatch(myNewsListIsFetch());
    fetch('http://127.0.0.1:4000/api/news/find/my', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: sessionStorage.getItem('userId')
        })
    })
    .then( async (res) => {
        const response = await res.json();
        if(res.status === 200){
            dispatch(myNewsListIsLoaded(response));
        }
        if(res.status === 404){
            dispatch(myNewsListIsFailed(response));
        }
        if(res.status === 500){
            dispatch(myNewsListIsFailed(response));
        }
    })
    .catch(err => dispatch(myNewsListIsFailed('Ошибка соединения')));
}

const subscribtionsNewsListIsFetch = (): SubscribtionsNewsListIsFetchType => {
    return{
        type: 'SUBSCRIBTIONS_NEWS_LIST_IS_FETCH'
    }
}

const subscribtionsNewsListIsLoaded = (news: Array<NewType>): SubscribtionsNewsListIsLoadedType => {
    return{
        type: 'SUBSCRIBTIONS_NEWS_LIST_IS_LOADED',
        payload: news
    }
}

const subscribtionsNewsListIsFailed = (error: string): SubscribtionsNewsListIsFailedType => {
    return{
        type: 'SUBSCRIBTIONS_NEWS_LIST_IS_FAILED',
        error
    }
}

const fetchSubscribtionsNewsList = () => (dispatch: Dispatch<any>) => {
    dispatch(subscribtionsNewsListIsFetch());
    fetch('http://127.0.0.1:4000/api/news/find/subscribtions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: sessionStorage.getItem('userId')
        })
    })
    .then( async (res) => {
        const response = await res.json();
        if(res.status === 200){
            dispatch(subscribtionsNewsListIsLoaded(response));
        }
        if(res.status === 404){
            dispatch(subscribtionsNewsListIsFailed(response));
        }
        if(res.status === 500){
            dispatch(subscribtionsNewsListIsFailed(response));
        }
    })
    .catch(err => dispatch(subscribtionsNewsListIsFailed('Ошибка соединения')));
}

const favouritesNewsListIsFetch = (): FavouritesNewsListIsFetchType => {
    return{
        type: 'FAVOURITES_NEWS_LIST_IS_FETCH'
    }
}

const favouritesNewsListIsLoaded = (news: Array<NewType>): FavouritesNewsListIsLoadedType => {
    return{
        type: 'FAVOURITES_NEWS_LIST_IS_LOADED',
        payload: news
    }
}

const favouritesNewsListIsFailed = (error: string): FavouritesNewsListIsFailedType => {
    return{
        type: 'FAVOURITES_NEWS_LIST_IS_FAILED',
        error
    }
}

const fetchFavouritesNewsList = () => (dispatch: Dispatch<any>) => {
    dispatch(favouritesNewsListIsFetch());
    fetch('http://127.0.0.1:4000/api/news/find/favourites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: sessionStorage.getItem('userId')
        })
    })
    .then( async (res) => {
        const response = await res.json();
        if(res.status === 200){
            dispatch(favouritesNewsListIsLoaded(response));
        }
        if(res.status === 404){
            dispatch(favouritesNewsListIsFailed(response));
        }
        if(res.status === 500){
            dispatch(favouritesNewsListIsFailed(response));
        }
    })
    .catch(err => dispatch(favouritesNewsListIsFailed('Ошибка соединения')));
}

const FavouritesNewsListItemIsDeleted = (id: string): FavouritesNewsListItemIsDeletedType => {
    return{
        type: 'FAVOURITES_NEWS_LIST_ITEM_IS_DELETED',
        id
    }
}

const FavouritesNewsListItemIsAdded = (newNewsItem: NewType): FavouritesNewsListItemIsAddedType => {
    return{
        type: 'FAVOURITES_NEWS_LIST_ITEM_IS_ADDED',
        newNewsItem
    }
}

export {
    fetchMyNewsList,
    fetchSubscribtionsNewsList,
    fetchFavouritesNewsList,
    myNewsListItemIsDeleted,
    myNewsListItemIsAdded,
    myNewsListIsLoaded,
    subscribtionsNewsListIsLoaded,
    favouritesNewsListIsLoaded
}