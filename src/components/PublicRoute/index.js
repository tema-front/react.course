import { Route, Redirect } from "react-router-dom";

export const PublicRoute = ({authed, ...props}) => {
    return (
        !authed ? <Route {...props} /> : <Redirect to='/chats' />
    )
    
}