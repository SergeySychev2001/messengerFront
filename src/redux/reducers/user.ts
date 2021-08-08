import { UserStateType, ActionType} from '../types/user';

const initialState: UserStateType = {
    userData: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action: ActionType): UserStateType => {
    switch(action.type){
        case 'USER_IS_FETCH':
            return {
                userData: null,
                loading: true,
                error: null
            };
        case 'USER_IS_LOADED':
            return {
                userData: action.payload,
                error: null,
                loading: false
            };
        case 'USER_IS_FAILED':
            return {
                userData: null,
                loading: false,
                error: action.error
            }
        case 'USER_AVATAR_IS_UPDATED': {
            const updatedUser = state.userData ?
            {...state.userData, avatar: action.avatar}:
            null
            return {
                ...state,
                userData: updatedUser
            }
        }
        default: return {...state};
    }
}

export default reducer;
