import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({authedProfile, ...props}) => {
    return (
        authedProfile ? <Route {...props} /> : <Redirect to='/' />
    )
    
}