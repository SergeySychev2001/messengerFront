import React from "react";
import '../styles/Subscribtions.scss';
import { SubscribtionsList } from './index';
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";

const Subscribtions: React.FC = () => {

    const location = useLocation();
    const history = useHistory();

    return(
        <div className="subscribtions">
            <div className="subscribtions__type-selector">
                <div className={location.pathname === '/subscribtions/list' 
                ? 'type-selector__item_active' 
                : 'type-selector__item' }
                     onClick={() => history.push('/subscribtions/list')}>Подписки</div>
                <div className={location.pathname === '/subscribtions/search' 
                ? 'type-selector__item_active' 
                : 'type-selector__item' }
                     onClick={() => history.push('/subscribtions/search')}>Поиск</div>
            </div>
            <Switch>
                <Route path='/subscribtions/list'>
                    <SubscribtionsList/>
                </Route>
                <Route path='/subscribtions/search'>
                    <SubscribtionsList isAll/>
                </Route>
                <Redirect to='/subscribtions/list'/>
            </Switch>
        </div> 
    )
}

export default Subscribtions;