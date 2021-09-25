// import { CONSTANTS } from "../../utils/constants"
import store from ".."

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

export const requestArticlesData = () => async (dispatch) => {
    dispatch(articlesLoading())
    let { list } = store.getState().storeArticles
    // Здесь подгружаем новости 
    // Для наглядности того, что я тут делаю, перенёс URL из констант прямо сюда
    // Итак, каждая новость, получаемая через наш API, должна быть уникальна, чтобы не совпадали ID
    // Эту самую уникальность задаём через параметер URL _start, который принимает число
    // И отдаёт новости начиная с переданного числа. 
    // Соответственно, начинаем подгружать посты с номера последнего поста, который имеем, то есть list.length
    // Так как новости я задал получать по 20 штук, то у нас получится такой порядок номеров 0-20 21-40 41-60 и т.д

    // Не смотря на всё это, при тесте мой код даёт сбои и в массиве оказываются одинаковые ID новостей
    // Пытался увеличивать таймер, который вызывает запрос, но ничего не сработало
    // В чём здесь проблема?
    // Это всё как-то связано с количеством подгружаемых постов за раз
    // Например, если подгружаю по 20 постов - то дублируются одни новости, при 30 - уже другие 
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