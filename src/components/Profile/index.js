import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// ref - получение БД, set - запись в раздел БД, onValue - подписка на изменение состояния 
import { ref, onValue } from 'firebase/database'
import { getProfileName, getAuthedProfile } from '../../store/profile/selectors';
import { Header } from '../Header';
import { AuthenticationProfile } from '../AuthenticationProfile';
import { db } from '../../services/firebase'
import { changeProfileName } from '../../store/profile/actions';

export const Profile = () => {
    const userName = useSelector(getProfileName);
    const authedProfile = useSelector(getAuthedProfile)
    const dispatch = useDispatch()

    const getHeaderName = () => {
        if (userName === 'User') return 'Profile' 
        else return `${userName}`
    }

    useEffect(() => {
        const userDBref = ref(db, 'users');
        const subscribe = onValue(userDBref, (snapshot) => {
            const data = snapshot.val();
            console.log('--------', data);
            dispatch(changeProfileName(data?.characterName || ''));
        })

        return subscribe;
    }, [])

    return (
        <div className='container'>
            {authedProfile ? <Header headerName={getHeaderName()} logout={true} /> 
            : <Header headerName={getHeaderName()} logout={false} />
            }
            
            <div className='contentProfile'>
                <div className='infoProfile'>
                    <span className='infoProfileText textColor'>
                        На этой странице Вы можете войти в свой профиль или зарегистрировать аккаунт.
                        Благодаря авторизации на нашем сайте, Вы сможете получить доступ к новостной ленте и к чатам,
                        где сможете обмениваться сообщениями с людьми 
                    </span>
                </div>
                <AuthenticationProfile />
            </div>
        </div>
    );
}

