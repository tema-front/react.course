import { CONSTANTS } from "../../utils/constants"
import { GET_ARTICLES_LOADING, GET_ARTICLES_SUCCESS, GET_ARTICLES_FAILURE} from "./actions"

const initialState = {
    list: [],
    request: {
        error: null,
        status: CONSTANTS.REQUEST_STATUS.IDLE
    }
}

export const articlesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ARTICLES_LOADING: {
            return {
                ...state,
                request: {
                    error: null,
                    status: CONSTANTS.REQUEST_STATUS.LOADING
                }
            }
        }
        
        case GET_ARTICLES_SUCCESS: { 
            return {
                ...state,
                request: {
                    error: null,
                    status: CONSTANTS.REQUEST_STATUS.SUCCESS
                },
                list: [
                    ...state.list,
                    ...payload
                ]
            }
        }

        case GET_ARTICLES_FAILURE: { 
            return {
                ...state,
                request: {
                    error: payload,
                    status: CONSTANTS.REQUEST_STATUS.FAILURE
                },
            }
        }

        default: return state;   
    }
}