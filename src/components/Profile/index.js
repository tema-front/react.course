import React, { useContext, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import { changeProfileName, toggleShowName } from '../../store/profile/actions'



export const Profile = () => {
    const contextValue = useContext(ThemeContext)
    debugger
    const showName = useSelector((state) => state.storeProfile.showName)
    const profile_name = useSelector((state) => state.storeProfile.profileName)

    const dispatch = useDispatch()
    const [profileName, setProfileName] = useState('')
     
    const handleClick = () => {
        dispatch(toggleShowName)
        dispatch(changeProfileName(profileName))
        setProfileName('')
    }

    return (
        <div>
            <h1 style={{color: contextValue.theme === 'light' ? 'red' : 'green '}}>Profile</h1>
            <button onClick={contextValue.changeTheme}>Изменить тему</button>
            <input 
                type="checkbox"
                checked={showName}
                value={showName}
                onChange={handleClick}
            />

            <input 
                type="value"
                checked={showName}
                value={profileName}
                onChange={(event) => {setProfileName(event.target.value)}}
                placeholder='Name'
            />

            <button onClick={handleClick}>Show Name</button>
            {showName && <div>Hello, {profile_name}!</div>}

        </div>
    );
}

