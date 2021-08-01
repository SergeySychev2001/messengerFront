import React, { ReactEventHandler } from "react";
import '../styles/NewsListItem.scss';
import deleteIcon from '../image/delete.svg';
import addIcon from '../image/add.svg';
import okIcon from '../image/ok.svg';
import { Modal } from './common/index';
import { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

type NewsListItemContainerProps = {
    id: string,
    body: string,
    name: string,
    surname: string,
    date: string,
    favouritesId: string | null,
    tags: string[] | null
    my?: boolean,
    subcribtions?: boolean,
    favourites?: boolean
}

const NewsListItemContainer: React.FC<NewsListItemContainerProps> = ({
    id,
    body,
    name,
    surname,
    date,
    tags,
    favouritesId,
    my,
    subcribtions,
    favourites
}) => {

    const [errorModal, setErrorModal] = useState<string | null>(null);
    const { my: myNews, subscribtions: subscribtionsNews, favourites: favouritesNews } = useTypedSelector(state => state.news);
    const {list, isLoading, error} = my ? myNews : subcribtions ? subscribtionsNews : favourites ? favouritesNews : {
        list: null,
        isLoading: false,
        error: null
    };
    const { myNewsListItemIsDeleted,
            myNewsListIsLoaded,
            favouritesNewsListIsLoaded,
            subscribtionsNewsListIsLoaded,
            notificationsListItemIsAdded } = useActions();

    const deleteNews = () => {
        fetch('http://127.0.0.1:4000/api/news/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then( async (res) => {
            const response = await res.json();
            if(res.status === 200){
                myNewsListItemIsDeleted(response);
                notificationsListItemIsAdded('Новость удалена');
            }
            if(res.status === 500){
                setErrorModal('Ошибка сервера');
            }
        })
        .catch(err => setErrorModal('Ошибка соединения'));
    }

    const addFavoriteNews = () => {
        fetch('http://127.0.0.1:4000/api/news/favourites/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('userId'),
                newsId: id
            })
        })
        .then( async (res) => {
            const response = await res.json();
            if(res.status === 200){    
                notificationsListItemIsAdded('Новость добавлена в избранные');
                const newList = list
                    ? list.map((item) => {
                        if(item.id !== id){
                            return item;
                        } else {
                            return {
                                ...item,
                                favouritesId: response
                            }
                        }
                    })
                    : [];
                console.log(newList)
                if(my){
                    myNewsListIsLoaded(newList);
                }
                if(subcribtions){
                    subscribtionsNewsListIsLoaded(newList);
                }
                if(favourites){
                    favouritesNewsListIsLoaded(newList);
                }
            }
            if(res.status === 500){
                setErrorModal('Ошибка сервера');
            }
        })
        .catch(err => setErrorModal('Ошибка соединения'));
    }

    const deleteFavoriteNews = () => {
        fetch('http://127.0.0.1:4000/api/news/favourites/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ favouritesId })
        })
        .then( async (res) => {
            const response = await res.json();
            console.log(response)
            if(res.status === 200){
                notificationsListItemIsAdded('Новость удалена из избранных');
                if(my){
                    const newList = list
                    ? list.map((item) => {
                        if(item.favouritesId !== response){
                            return item;
                        } else {
                            return {
                                ...item,
                                favouritesId: null
                            }
                        }
                    })
                    : [];
                    myNewsListIsLoaded(newList);
                }
                if(subcribtions){
                    const newList = list
                    ? list.map((item) => {
                        if(item.favouritesId !== response){
                            return item;
                        } else {
                            return {
                                ...item,
                                favouritesId: null
                            }
                        }
                    })
                    : [];
                    subscribtionsNewsListIsLoaded(newList);
                }
                if(favourites){
                    const newList = list
                    ? list.filter(({favouritesId}) => favouritesId !== response) : [];
                    favouritesNewsListIsLoaded(newList);
                }
            }
            if(res.status === 500){
                setErrorModal('Ошибка сервера');
            }
        })
        .catch(err => setErrorModal('Ошибка соединения'));
    }

    return(
        <NewsListItem   body={body} 
                        name={name} 
                        surname={surname} 
                        date={date} 
                        my={my}
                        tags={tags}
                        favouritesId={favouritesId}
                        deleteNews={deleteNews}
                        errorModal={errorModal ? errorModal : undefined}
                        errorModalClose={() => setErrorModal(null)}
                        addFavoriteNews={addFavoriteNews}
                        deleteFavoriteNews={deleteFavoriteNews}/>
    )
}

type NewsListItemProps = {
    body: string,
    name: string,
    surname: string,
    date: string,
    tags: string[] | null,
    favouritesId: string | null,
    my?: boolean,
    errorModal?: string
    errorModalClose: () => void,
    deleteNews: () => void,
    addFavoriteNews: () => void,
    deleteFavoriteNews: () => void
}

const NewsListItem: React.FC<NewsListItemProps> = ({
    body,
    name,
    surname,
    date,
    favouritesId,
    my,
    tags,
    errorModal,
    errorModalClose,
    deleteNews,
    addFavoriteNews,
    deleteFavoriteNews
}) => {
    const dateContent = new Date(date);
    const tagsContent = tags ? tags.map((item, idx) => {
        return (<span className="item__tag">{`#${item}`}</span>)
    }) : (<span className="item__tag" style={{color: 'rgb(194, 122, 28)'}}>Тегов нет</span>);
    return(
        <>
            {errorModal ? <Modal text={errorModal} exitModal={() => errorModalClose()}/> : null}
            <div className="news-list-item">
                {!favouritesId
                ? <img className="item__save" onClick={() => addFavoriteNews()} src={addIcon} alt="Сохранить"/>
                : <img className="item__save" onClick={() => deleteFavoriteNews()} src={okIcon} alt="Удалить" />}
                {my ? <img className="item__delete" onClick={() => deleteNews()} src={deleteIcon} alt="Удалить" /> : null}
                <span className="item__text">{body}</span>
                <div className="item__footer" style={!my ? {marginLeft: '30px'} : undefined}>
                    <div className="item__tags-hover">
                        <span>Теги</span>
                        <span className="item__tags">{tagsContent}</span>
                    </div>
                    <div className="item__info">
                        <span className="item__user">{surname} {name}</span>
                        <span className="item__data">
                            {`${dateContent.getHours()}:${dateContent.getMinutes()}
                            ${dateContent.getDate()}.${dateContent.getMonth() + 1}.${dateContent.getFullYear()}`}
                        </span>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default NewsListItemContainer;