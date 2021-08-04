type UserStateType = {
    userData: UserType | null,
    loading: boolean,
    error: string | null
}

type UserType = {
    id: string,
    name: string,
    surname: string,
    avatar: boolean,
    day: number,
    month: number,
    year: number,
    city: string | null
}

type UserIsFetchType = {
    type: 'USER_IS_FETCH'  
}

type UserIsLoadedType = {
    type: 'USER_IS_LOADED',
    payload: UserType
}

type UserIsFailedType = {
    type: 'USER_IS_FAILED',
    error: string
}

type UserAvatarIsFetch = {
    type: 'USER_AVATAR_IS_FETCH'
}

type ActionType = {
    type: 'USER_IS_FETCH' | 'USER_IS_LOADED' | 'USER_IS_FAILED' | 'USER_AVATAR_IS_FETCH',
    payload: UserType,
    error: string
}

export type {
    UserStateType,
    UserType,
    UserIsFetchType,
    UserIsLoadedType,
    UserIsFailedType,
    UserAvatarIsFetch,
    ActionType
}