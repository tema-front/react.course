export const CHANGE_PROFILE_NAME = 'PROFILE::CHANGE_PROFILE_NAME';
export const LOGIN_PROFILE = 'PROFILE::LOGIN_PROFILE';
export const LOGOUT_PROFILE = 'PROFILE::LOGOUT_PROFILE';

export const changeProfileName = (name) => ({
    type: CHANGE_PROFILE_NAME,
    payload: name
})

export const loginProfile = {
    type: LOGIN_PROFILE,
}

export const logoutProfile = {
    type: LOGOUT_PROFILE,
}

