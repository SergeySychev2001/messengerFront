import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Account, Messages, News, Subscribtions} from './index';
import '../styles/Main.scss';

const Main: React.FC = () => {
    return(
        <main className="main">
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