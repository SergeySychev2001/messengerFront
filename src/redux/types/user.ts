type UserStateType = {
    userData: UserType | null,
    loading: boolean,
    error: string | null
}

type UserType = {
    id: string,
    name: string,
    surname: string,
    avatar: string | null,
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

type UserAvatarIsUpdatedType = {
    type: 'USER_AVATAR_IS_UPDATED',
    avatar: string
}

type ActionType = {
    type: 'USER_IS_FETCH' | 
    'USER_IS_LOADED' | 
    'USER_IS_FAILED' | 
    'USER_AVATAR_IS_UPDATED',
    payload: UserType,
    error: string,
    avatar: string
}

export type {
    UserStateType,
    UserType,
    UserIsFetchType,
    UserIsLoadedType,
    UserIsFailedType,
    UserAvatarIsUpdatedType,
    ActionType
}