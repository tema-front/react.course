import React, { useState } from 'react';
import { MyButton } from '../UI/button/MyButton';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

export const HomePage = ({ onLogin }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        setLogin('')
        setPassword('')
        onLogin()
    }

    return (
        <>
        <div className='container'>
        <Header headerName='Home Page' />
            <div>
                <form onSubmit={handleLogin}>
                    <input value={login} onChange={(event) => setLogin(event.target.value)}></input>
                    <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    <input type='submit' value='Login' />
                </form>
            </div>
            <div className='pageNav'>
                <Link to={`/chats/`}><MyButton>Чаты</MyButton></Link>
                <Link to={`/profile/`}><MyButton>Профиль</MyButton></Link>
                <Link to={`/news/`}><MyButton>Новости</MyButton></Link>
            </div>
        </div>
        </>
    );
}

