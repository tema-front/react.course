import React from 'react';
import { MyButton } from '../UI/button/MyButton';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className='homePageContainer'>
            <h1 className='headerHomePage'>Home Page</h1>
            <div className='pageNav'>
                <Link to={`/chats/`}><MyButton>Чаты</MyButton></Link>
                <Link to={`/profile/`}><MyButton>Профиль</MyButton></Link>
                <Link to={`/news/`}><MyButton>Новости</MyButton></Link>
            </div>

        </div>
    );
}

