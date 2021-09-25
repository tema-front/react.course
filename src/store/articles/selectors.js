import { CONSTANTS } from "../../utils/constants"

export const getArticlesLoading = (state) => {
    return state.storeArticles.request.status === CONSTANTS.REQUEST_STATUS.LOADING
}

export const getArticlesError = (state) => state.storeArticles.request.error
export const getArticlesList = (state) => state.storeArticles.list
export const getArticlesListLength = (state) => state.storeArticles.list.length


