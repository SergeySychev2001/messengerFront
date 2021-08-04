import { ActionType, MessagesStateType } from '../types/messages';

const initialState: MessagesStateType = {
    chatList: undefined,
    loading: false,
    error: undefined
}

const reducer = (state = initialState, action: ActionType): MessagesStateType => {
    switch(action.type){
        case 'MESSAGES_IS_FETCH': {
            return{
                chatList: undefined,
                loading: true,
                error: undefined
            }
        }
        case 'MESSAGES_IS_LOADED': {
            return{
                chatList: action.chatList,
                loading: false,
                error: undefined
            }
        }
        case 'MESSAGES_IS_FAILED': {
            return{
                chatList: undefined,
                loading: false,
                error: action.error
            }
        }
        // case 'MESSAGE_IS_ADDED': {
        //     // [action.message, ...state.chatList.]
        //     const newMessageList = 
        //     state.chatList ?

            
            
        //     return{
        //         ...state
        //     }
        // }
        default: return {...state};
    }
}

export default reducer;