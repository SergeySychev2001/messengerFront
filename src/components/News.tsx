import React from "react";
import { Switch, Route, useLocation, Redirect, useHistory } from 'react-router-dom';
import { NewsList, NewsAddModal } from './index';
import '../styles/News.scss';
import { useState } from "react";

const News: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const [newsAddModal, setNewsAddModal] = useState<boolean>(false);
    return(
        <>
            {newsAddModal ? <NewsAddModal exitModal={() => setNewsAddModal(false)}/> : null}
            <div className="news">
                <div className="news__type-selector">
                    <div className={location.pathname === '/news/my' 
                    ? 'type-selector__item_active' 
                    : 'type-selector__item' }
                        onClick={() => history.push('/news/my')}>Мои</div>
                    <div className={location.pathname === '/news/subscriptions' 
                    ? 'type-selector__item_active' 
                    : 'type-selector__item' }
                        onClick={() => history.push('/news/subscriptions')}>Подписки</div>
                    <div className={location.pathname === '/news/favourites' 
                    ? 'type-selector__item_active' 
                    : 'type-selector__item' }
                        onClick={() => history.push('/news/favourites')}>Избранные</div>
                </div>
                <Switch>
                    <Route path='/news/my'>
                        <button onClick={() => setNewsAddModal(true)} className='news__add'>Добавить</button>
                        <NewsList my/>
                    </Route>
                    <Route path='/news/subscriptions'>
                        <NewsList subcribtions/>
                    </Route>
                    <Route path='/news/favourites'>
                        <NewsList favourites/>
                    </Route>
                    <Redirect to='/news/my'/>
                </Switch>
            </div> 
        </>
    )
}

export default News;