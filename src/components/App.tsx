import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/App.scss';
import {Header, Main, Authorization, Registration} from './index';

const App: React.FC = () => {
    return(
        <div className="app">
            <Switch>
                <Route path="/authorization" render={() => {
                    if(sessionStorage.getItem('token')){
                        return <Redirect to="/news"/>
                    } else {
                        return <Authorization/>
                    }
                }}/>
                <Route path="/registration" render={() => {
                    if(sessionStorage.getItem('token')){
                        return <Redirect to="/news"/>
                    } else {
                        return <Registration/>
                    }
                }}/>
                <Route path="/" render={() => {
                    if(sessionStorage.getItem('token')){
                        return(
                                <>
                                    <Header/>
                                    <Main/>
                                </>
                            )
                    } else {
                        return  <Redirect to="/authorization"/>
                    }
                }}/>   
            </Switch>
        </div>
    )
}

export default App;