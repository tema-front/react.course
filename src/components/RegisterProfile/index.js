import { React, useState } from "react"
import { useDispatch } from "react-redux"
import { signUp } from "../../services/firebase"
import { ref, set } from 'firebase/database'
import { db } from '../../services/firebase'
import { changeProfileName } from "../../store/profile/actions"
import { MyButton } from "../UI/button/MyButton"


export const RegisterProfile = () => {
    const [userName, setUserName] = useState('');
    const [emailRegister, setEmailRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const dispatch = useDispatch();

    const makeUserName = (event) => {   
        let name = ''
        if (event.target.value) {
            name = event.target.value?.[0]?.toUpperCase() + event.target.value?.slice(1)?.toLowerCase();
        }
        setUserName(name)
    }

    const onRegister = async () => {
        debugger
        set(ref(db, 'users'), {
            characterName: userName
        })
        dispatch(changeProfileName(userName));
        await signUp(emailRegister, passwordRegister)
    }

    return (
        <div className='loginProfile'>
            <input 
                className='datasLoginProfile loginNameProfile' 
                placeholder='Your name' 
                onChange={makeUserName}
                value={userName} 
            ></input>
            <input   
                type='email'
                value={emailRegister} 
                onChange={event => setEmailRegister(event.target.value)}
                className='datasLoginProfile loginNameProfile'
                placeholder='Email'
            ></input>
            <input
                type="password"
                value={passwordRegister}
                onChange={event => setPasswordRegister(event.target.value)}
                className='datasLoginProfile passwordLoginProfile' 
                placeholder='Password'
            ></input>
            <input type="password" className='datasLoginProfile passwordLoginProfile' placeholder='Password confirmation'></input>
            <MyButton onClick={onRegister} style={{'maxWidth': '20px'}}>Register</MyButton>
        </div>
    )
}