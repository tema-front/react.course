import { TOGGLE_SHOW_NAME, CHANGE_PROFILE_NAME }  from './actions'

const initialState = {
    showName: false,
    profileName: 'default'
}

export const profileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case TOGGLE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName
            }
        }
        
        case CHANGE_PROFILE_NAME: {
            return {
                ...state,
                profileName: payload
            }
        }

        default: return state;   
    }
}