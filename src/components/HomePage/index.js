import React from 'react';
import { MyButton } from '../UI/button/MyButton';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className='homePageContainer'>
            <h1 className='headerHomePage'>Home Page</h1>
            <MyButton><Link to={`/chats/`}>Чаты</Link></MyButton>
            <MyButton><Link to={`/profile/`}>Профиль</Link></MyButton>

        </div>
    );
}

