import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Account, Messages, News, Subscribtions} from './index';
import '../styles/Main.scss';
import { Notifications } from './common';
import socketIO from '../socket/socket';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Main: React.FC = () => {
    const { socketIsConnected, socketIsDisconnected, fetchUser, notificationsListItemIsAdded } = useActions();
    const { socket } = useTypedSelector(state => state.socket);
    useEffect(() => {
        const socket = socketIO();
        socketIsConnected(socket);
        fetchUser()
        socket.on('sendMessageToClient', (data) => {
            notificationsListItemIsAdded('Получено сообщение');
        });
        return () => {
            socket.disconnect()
            socketIsDisconnected()
        };
    }, []);
    return(
        <main className="main">
            <Notifications/>
            <Switch>
                <Route path="/messages">
                    <Messages/>
                </Route>
                <Route path="/account">
                    <Account/> 
                </Route>
                <Route path="/news">
                    <News/>
                </Route>
                <Route path="/subscribtions">
                    <Subscribtions/>
                </Route>
            </Switch>
            
        </main>
    )
}

export default Main;