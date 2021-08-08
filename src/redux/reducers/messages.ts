import { ActionType, ChatListType, MessagesStateType } from '../types/messages';
import cloneDeep from 'lodash/cloneDeep';

const initialState: MessagesStateType = {
    chatList: undefined,
    loading: false,
    error: undefined,
    selectedUserId: undefined
}

const reducer = (state = initialState, action: ActionType): MessagesStateType => {
    switch(action.type){
        case 'MESSAGES_IS_FETCH': {
            return{
                chatList: undefined,
                loading: true,
                error: undefined,
                selectedUserId: undefined
            }
        }
        case 'MESSAGES_IS_LOADED': {
            return{
                chatList: action.chatList,
                loading: false,
                error: undefined,
                selectedUserId: undefined
            }
        }
        case 'MESSAGES_IS_FAILED': {
            return{
                chatList: undefined,
                loading: false,
                error: action.error,
                selectedUserId: undefined
            }
        }
        case 'USER_IS_SELECTED': {
            return{
                ...state,
                selectedUserId: action.userId
            }
        }
        case 'MESSAGE_IS_ADDED':{
            const user = action.user;
            const message = action.message;
            const findedChatItem = state.chatList ? 
            state.chatList.findIndex((item) => item.user.id === user.id):
            -2; 
            if(findedChatItem > -1){
                const newChatList = state.chatList ? cloneDeep(state.chatList) : undefined;
                if(newChatList) newChatList[findedChatItem].messages.push(message);
                return{
                    ...state,
                    chatList: newChatList
                }
            }
            if(findedChatItem === -1){
                const newChatList = state.chatList ? cloneDeep(state.chatList) : undefined;
                const newChatItem: ChatListType = {
                    user: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        avatar: user.avatar
                    },
                    messages: [{
                        id: message.id,
                        date: message.date,
                        isMy: message.isMy,
                        value: message.value
                    }]
                };
                if(newChatList) newChatList.push(newChatItem);
                return {
                    ...state,
                    chatList: newChatList
                }
            }
            if(findedChatItem === -2){
                const newChatItem: ChatListType = {
                    user: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        avatar: user.avatar
                    },
                    messages: [{
                        id: message.id,
                        date: message.date,
                        isMy: message.isMy,
                        value: message.value
                    }]
                };
                const newChatList: ChatListType[] = [newChatItem]; 
                console.log(newChatList)
                return{
                    loading: false,
                    error: undefined,
                    selectedUserId: user.id,
                    chatList: newChatList
                }
            }
            return{
                ...state
            }
        }
        case 'MY_MESSAGE_IS_ADDED':{
            const message = action.message;
            const findedChatItem = state.chatList ? 
            state.chatList.findIndex((item) => item.user.id === state.selectedUserId):
            -1;
            if(findedChatItem > -1){
                const newChatList = state.chatList ? cloneDeep(state.chatList) : undefined;
                if(newChatList) newChatList[findedChatItem].messages.push(message);
                return{
                    ...state,
                    chatList: newChatList
                }
            }
            return{
                ...state
            }
        }
        default: return {...state};
    }
}

export default reducer;