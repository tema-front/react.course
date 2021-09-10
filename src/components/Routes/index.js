import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Chats } from '../Chats';
import { HomePage } from '../HomePage';
import { NotFound } from '../NotFound';
import { Profile } from '../Profile';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/chats/:chatId?" component={Chats} />
                <Route path="/profile/" component={Profile} /> {/* Страница профиля */}     
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

