// import { CONSTANTS } from "../../utils/constants"

export const GET_ARTICLES_LOADING = 'ARTICLES::GET_ARTICLES_LOADING'
export const GET_ARTICLES_SUCCESS = 'ARTICLES::GET_ARTICLES_SUCCLESS'
export const GET_ARTICLES_FAILURE = 'ARTICLES::GET_ARTICLES_FAILURE'

export const articlesLoading = () => ({
    type: GET_ARTICLES_LOADING,
})

export const articlesSuccsess = (article) => ({
    type: GET_ARTICLES_SUCCESS,
    payload: article
})

export const articlesFailure = (error) => ({
    type: GET_ARTICLES_FAILURE,
    payload: error
})

export const requestArticlesData = () => async (dispatch, getState) => {
    dispatch(articlesLoading())
    let { list } = getState().storeArticles
    const URL = `https://api.spaceflightnewsapi.net/v3/articles?_limit=20&_start=${list.length}`

    try {
        const request = await fetch(URL)

        if (!request.ok) {
            throw new Error('Error fetch in my code')
        }

        const result = await request.json()
        dispatch(articlesSuccsess(result))
    } catch (error) {
        dispatch(articlesFailure(error.message))
    }

}