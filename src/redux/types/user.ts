type UserType = {
    id: string | null,
    name: string | null,
    surname: string | null,
    avatar: boolean,
    day: number | null,
    month: number | null,
    year: number | null,
    city: string | null,
    error: string | null,
    loading: boolean
}

type UserIsFetchType = {
    type: 'USER_IS_FETCH',
    payload: {
        id: 'Загрузка',
        name:'Загрузка',
        surname: 'Загрузка',
        day: 0,
        month: 0,
        year: 0,
        city: 'Загрузка',
        error: null,
        loading: true,
        avatar: false
    }   
}

type UserIsLoadedType = {
    type: 'USER_IS_LOADED',
    payload: UserType
}

type UserIsRemovedType = {
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

type UserIsFailedType = {
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
        error: string,
        loading: false
    }
}

type ActionType = {
    type: 'USER_IS_FETCH' | 'USER_IS_LOADED' | 'USER_IS_REMOVED' | 'USER_IS_FAILED',
    payload: UserType
}

export type {
    UserType,
    UserIsFetchType,
    UserIsLoadedType,
    UserIsRemovedType,
    UserIsFailedType,
    ActionType
}