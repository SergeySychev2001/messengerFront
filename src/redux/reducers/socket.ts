import { SocketStateType, ActionType } from '../types/socket';

const initialState: SocketStateType = {
    socket: undefined
}

const reducer = (state = initialState, action: ActionType): SocketStateType => {
    switch(action.type){
        case 'SOCKET_IS_CONNECTED':{
            return{
                socket: action.payload
            }
        }
        case 'SOCKET_IS_DISCONNECTED':{
            return{
                socket: undefined
            }
        }
        default: return {...state}
    }
}

export default reducer;