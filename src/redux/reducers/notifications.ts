import { ActionType, NotificationsStateType } from '../types/notifications';

const initialState: NotificationsStateType = {
    list: []
}

const reducer = (state = initialState, action: ActionType): NotificationsStateType => {
    switch(action.type){
        case 'NOTIFICATIONS_LIST_ITEM_IS_ADDED': {
            const newList = state.list ?
            [action.payload, ...state.list] :
            [action.payload]
            return {
                list: newList
            }
        }
        case 'NOTIFICATIONS_LIST_ITEM_IS_DELETED': {
            const notificationId = state.list?.findIndex(({id}) => id === action.id);
            console.log(notificationId)
            const newList = state.list && notificationId !== undefined ?
            [...state.list.slice(0, notificationId), ...state.list.slice(notificationId + 1)] :
            null
            return {
                list: newList ? newList : null
            }
        }
        default: return {...state}
    }
}

export default reducer;