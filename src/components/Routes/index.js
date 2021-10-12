import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { getAuthedProfile } from '../../store/profile/selectors';
import { Chats } from '../Chats';
import { HomePage } from '../HomePage';
import { News } from '../News';
import { NotFound } from '../NotFound';
import { PrivateRoute } from '../PrivateRoute';
import { Profile } from '../Profile';

export const Routes = () => {
    const authedProfile = useSelector(getAuthedProfile)

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />  
                <PrivateRoute path="/chats/:chatId?" component={Chats} authedProfile={authedProfile}/>
                <Route path="/profile" exact component={Profile} />
                <PrivateRoute path="/news" component={News} authedProfile={authedProfile}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

