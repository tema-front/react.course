import React, { useContext } from 'react';
import ThemeContext from '../../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowName } from '../../store/profile/actions'

export const Profile = () => {
    const contextValue = useContext(ThemeContext)

    const showName = useSelector((state) => state.showName)
    const dispatch = useDispatch()
     
    const handleClick = () => {
        dispatch(toggleShowName)
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

            <button onClick={handleClick}>Show Name</button>
            {showName && <div>Show Name is true</div>}

        </div>
    );
}

