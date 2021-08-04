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
        case 'USER_AVATAR_IS_FETCH': {
            const newUserData = state.userData ? {...state.userData, avatar: false} : null;
            return {
                ...state,
                userData: newUserData
            }
        }
        default: return {...state};
    }
}

export default reducer;
