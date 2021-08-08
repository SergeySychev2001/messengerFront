import { Dispatch } from 'react';
import { 
    MessagesIsFetchType, 
    MessagesIsLoadedType, 
    MessagesIsFailedType,
    MessageIsAddedType,
    MyMessageIsAddedType,
    MessageType,
    UserType,
    ChatListType, 
    UserIsSelected
} from '../types/messages';

const messagesIsFetchType = (): MessagesIsFetchType => {
    return{
        type: 'MESSAGES_IS_FETCH'
    }
};
const messagesIsLoadedType = (chatList: Array<ChatListType>): MessagesIsLoadedType => {
    return{
        type: 'MESSAGES_IS_LOADED',
        chatList
    }
};
const messagesIsFailedType = (error: string): MessagesIsFailedType => {
    return{
        type: 'MESSAGES_IS_FAILED',
        error
    }
};

const userIsSelected = (userId: string): UserIsSelected => {
    return{
        type: 'USER_IS_SELECTED',
        userId
    }
}

const messageIsAdded = (message: MessageType, user: UserType): MessageIsAddedType => {
    return{
        type: 'MESSAGE_IS_ADDED',
        message,
        user 
    }
}

const myMessageIsAdded = (message: MessageType): MyMessageIsAddedType => {
    return{
        type: 'MY_MESSAGE_IS_ADDED',
        message
    }
}

const fetchMessages = () => (dispatch: Dispatch<any>) => {
    dispatch(messagesIsFetchType());
    fetch('http://localhost:4000/api/messages/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: sessionStorage.getItem('userId')})
    })
    .then( async (res) => {
        const response = await res.json();
        if(res.status === 200){
            if(typeof response === 'string'){
                dispatch(messagesIsFailedType(response));
            } else {
                dispatch(messagesIsLoadedType(response));
                dispatch(userIsSelected(response[0].user.id));
            }
        }
        if(res.status === 500){
            dispatch(messagesIsFailedType('Ошибка соединения'));
        }
    })
    .catch(err => dispatch(messagesIsFailedType('Ошибка соединения')));
}

export {
    fetchMessages,
    messageIsAdded,
    myMessageIsAdded,
    userIsSelected
}