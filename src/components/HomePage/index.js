import React from 'react';
import { MyButton } from '../UI/button/MyButton';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div className='homePageContainer'>
            <h1 className='headerHomePage'>Home Page</h1>
            <Link to={`/chats/`}><MyButton>Чаты</MyButton></Link>
           <Link to={`/profile/`}><MyButton>Профиль</MyButton></Link>
        </div>
    );
}

