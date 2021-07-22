type SubscribtionsType = {
    subscribtionsList: {
        list: Array<UserType> | null,
        isLoading: boolean,
        error: string | null
    }
    searchList: {
        list: Array<UserType> | null,
        isLoading: boolean,
        error: string | null
    }
}

type UserType = {
    id: string,
    name: string,
    surname: string,
    avatar: boolean,
    day: number,
    month: number,
    year: number,
    city: string,
}

type SearchListIsFetchType = {
    type: 'SEARCH_LIST_IS_FETCH'
}

type SearchListIsLoadedType = {
    type: 'SEARCH_LIST_IS_LOADED',
    payload: UserType[] | null
}

type SearchListIsFailedType = {
    type: 'SEARCH_LIST_IS_FAILED',
    error: string
}

type SubscribtionsListIsFetchType = {
    type: 'SUBSCRIBTIONS_LIST_IS_FETCH'
}

type SubscribtionsListIsLoadedType = {
    type: 'SUBSCRIBTIONS_LIST_IS_LOADED',
    payload: Array<UserType> | null
}

type SubscribtionsListIsFailedType = {
    type: 'SUBSCRIBTIONS_LIST_IS_FAILED',
    error: string
}

type ActionType = {
    type: 'SEARCH_LIST_IS_FETCH' 
    | 'SEARCH_LIST_IS_LOADED' 
    | 'SEARCH_LIST_IS_FAILED'
    | 'SUBSCRIBTIONS_LIST_IS_FETCH'
    | 'SUBSCRIBTIONS_LIST_IS_LOADED'
    | 'SUBSCRIBTIONS_LIST_IS_FAILED',
    payload: Array<UserType>,
    error: string
}

export type{
    SubscribtionsType,
    UserType,
    ActionType,
    SearchListIsFailedType,
    SearchListIsFetchType,
    SearchListIsLoadedType,
    SubscribtionsListIsFetchType,
    SubscribtionsListIsLoadedType,
    SubscribtionsListIsFailedType
};