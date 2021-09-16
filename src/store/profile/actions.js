export const TOGGLE_SHOW_NAME = 'PROFILE::TOGGLE_SHOW_NAME';
export const CHANGE_PROFILE_NAME = 'PROFILE::CHANGE_NAME';


export const toggleShowName = {
    type: TOGGLE_SHOW_NAME,
}

export const changeProfileName = (name) => ({
    type: CHANGE_PROFILE_NAME,
    payload: name
})
