import { LOGIN_PROFILE, LOGOUT_PROFILE, CHANGE_PROFILE_NAME }  from './actions'

const initialState = {
    profileName: 'User',
    authedProfile: false
}

export const profileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGIN_PROFILE: {
            return {
                ...state,
                authedProfile: true
            }
        }

        case LOGOUT_PROFILE: {
            return {
                ...state,
                authedProfile: false
            }
        }
        
        case CHANGE_PROFILE_NAME: {

            return {
                ...state,
                profileName: payload,
                authedProfile: true
            }
        }

        default: return state;   
    }
}