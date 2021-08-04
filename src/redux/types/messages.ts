type MessagesStateType = {
    chatList: Array<ChatListType> | undefined,
    loading: boolean,
    error: string | undefined
}

type ChatListType = {
    user: UserType
    messages: Array<MessageType>
}

type MessageType = {
    id: string,
    date: Date,
    isMy: boolean,
    value: string
}

type UserType = {
    id: string,
    name: string,
    surname: string,
    avatar: string
}

type MessagesIsFetchType = {
    type: 'MESSAGES_IS_FETCH'
}

type MessagesIsLoadedType = {
    type: 'MESSAGES_IS_LOADED',
    chatList: Array<ChatListType>
}

type MessagesIsFailedType = {
    type: 'MESSAGES_IS_FAILED',
    error: string
}

type MessageIsAddedType = {
    type: 'MESSAGE_IS_ADDED',
    message: MessageType
}

type ActionType = {
    type: 'MESSAGES_IS_FETCH' |
    'MESSAGES_IS_LOADED' |
    'MESSAGES_IS_FAILED' |
    'MESSAGE_IS_ADDED',
    chatList: Array<ChatListType>,
    error: string,
    message: MessageType
}

export type {
    MessagesStateType,
    MessagesIsFetchType,
    MessagesIsLoadedType,
    MessagesIsFailedType,
    MessageIsAddedType,
    ChatListType,
    ActionType
}