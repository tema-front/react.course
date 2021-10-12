import React, { useState } from 'react';
import { LoginProfile } from '../LoginProfile';
import { MyButton } from '../UI/button/MyButton';
import { RegisterProfile } from '../RegisterProfile';

export const AuthenticationProfile = () => {
    const [registerWindow, setRegisterWindow] = useState(false)
    const [loginWindow, setLoginWindow] = useState(true)
    

    const openRegisterWindow = () => {
        setLoginWindow(false)
        setRegisterWindow(true)
    }

    const openLoginWindow = () => {
        setRegisterWindow(false)
        setLoginWindow(true)
    }

    return (
        <div className='loginAndRegister'>
            <div className='btnLoginOrRegister'>
                <MyButton onClick={openLoginWindow} style={{'marginRight': '40px'}}>Login</MyButton>
                <MyButton onClick={openRegisterWindow}>Register</MyButton>
            </div>

            {loginWindow && <LoginProfile />}
            {registerWindow && <RegisterProfile />}
        </div>
    );
}

