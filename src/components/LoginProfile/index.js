import React, { useEffect, useState } from 'react';
import { MyButton } from "../UI/button/MyButton"
import { login, auth } from '../../services/firebase'
import { onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';
import { loginProfile, logoutProfile } from '../../store/profile/actions';

export const LoginProfile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) dispatch(loginProfile)
            else dispatch(logoutProfile) 
        });

        return unsubscribe
    })

    const handleLogin = async () => {
        debugger
        try {
            await login(email, password)
        } catch (error) {
            console.log('Ошибка в async ' + error);
        }
    }

    return (
        <div className='loginProfile'>
            <input
                type='email'
                value={email}
                onChange={(event) => { setEmail(event.target.value) }}
                className='datasLoginProfile loginNameProfile'
                placeholder='Email'
            ></input>

            <input
                type='password'
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
                className='datasLoginProfile emailLoginProfile'
                placeholder='Password'
            ></input>


            <MyButton style={{ 'maxWidth': '20px' }} onClick={handleLogin}>Login</MyButton>
        </div>
    )
}