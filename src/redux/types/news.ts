type NewsStateType = {
    my: NewsType,
    subscribtions: NewsType,
    favourites: NewsType
}

type NewsType = {
    list: Array<NewType> | null,
    isLoading: boolean,
    error: string | null
}

type NewType = {
    id: string,
    body: string,
    userId: string,
    name: string,
    surname: string,
    tags: string[] | null,
    date: string,
    favouritesId: string | null
}

type MyNewsListIsFetchType = {
    type: 'MY_NEWS_LIST_IS_FETCH'
}

type MyNewsListIsLoadedType = {
    type: 'MY_NEWS_LIST_IS_LOADED',
    payload: Array<NewType>
}

type MyNewsListIsFailedType = {
    type: 'MY_NEWS_LIST_IS_FAILED',
    error: string
}

type MyNewsListItemIsDeletedType = {
    type: 'MY_NEWS_LIST_ITEM_IS_DELETED',
    id: string
}

type MyNewsListItemIsAddedType = {
    type: 'MY_NEWS_LIST_ITEM_IS_ADDED',
    newNewsItem: NewType
}

type SubscribtionsNewsListIsFetchType = {
    type: 'SUBSCRIBTIONS_NEWS_LIST_IS_FETCH'
}

type SubscribtionsNewsListIsLoadedType = {
    type: 'SUBSCRIBTIONS_NEWS_LIST_IS_LOADED',
    payload: Array<NewType>
}

type SubscribtionsNewsListIsFailedType = {
    type: 'SUBSCRIBTIONS_NEWS_LIST_IS_FAILED',
    error: string
}

type FavouritesNewsListIsFetchType = {
    type: 'FAVOURITES_NEWS_LIST_IS_FETCH'
}

type FavouritesNewsListIsLoadedType = {
    type: 'FAVOURITES_NEWS_LIST_IS_LOADED',
    payload: Array<NewType>
}

type FavouritesNewsListIsFailedType = {
    type: 'FAVOURITES_NEWS_LIST_IS_FAILED',
    error: string
}

type FavouritesNewsListItemIsDeletedType = {
    type: 'FAVOURITES_NEWS_LIST_ITEM_IS_DELETED',
    id: string
}

type FavouritesNewsListItemIsAddedType = {
    type: 'FAVOURITES_NEWS_LIST_ITEM_IS_ADDED',
    newNewsItem: NewType
}

type ActionType = {
    type: 'MY_NEWS_LIST_IS_FETCH'
    | 'MY_NEWS_LIST_IS_LOADED'
    | 'MY_NEWS_LIST_IS_FAILED'
    | 'MY_NEWS_LIST_ITEM_IS_DELETED'
    | 'SUBSCRIBTIONS_NEWS_LIST_IS_FETCH'
    | 'SUBSCRIBTIONS_NEWS_LIST_IS_LOADED'
    | 'SUBSCRIBTIONS_NEWS_LIST_IS_FAILED'
    | 'FAVOURITES_NEWS_LIST_IS_FETCH'
    | 'FAVOURITES_NEWS_LIST_IS_LOADED'
    | 'FAVOURITES_NEWS_LIST_IS_FAILED'
    | 'MY_NEWS_LIST_ITEM_IS_ADDED'
    | 'FAVOURITES_NEWS_LIST_ITEM_IS_DELETED'
    | 'FAVOURITES_NEWS_LIST_ITEM_IS_ADDED',
    payload: Array<NewType>,
    error: string,
    id: string,
    newNewsItem: NewType
}

export type {
    NewsStateType,
    NewType,
    MyNewsListIsFetchType,
    MyNewsListIsLoadedType,
    MyNewsListIsFailedType,
    MyNewsListItemIsDeletedType,
    MyNewsListItemIsAddedType,
    SubscribtionsNewsListIsFetchType,
    SubscribtionsNewsListIsLoadedType,
    SubscribtionsNewsListIsFailedType,
    FavouritesNewsListIsFetchType,
    FavouritesNewsListIsLoadedType,
    FavouritesNewsListIsFailedType,
    FavouritesNewsListItemIsDeletedType,
    FavouritesNewsListItemIsAddedType,
    ActionType
}