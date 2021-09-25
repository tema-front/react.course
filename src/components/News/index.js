import { useEffect } from "react"
import { CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from "react-redux";
import { getArticlesList, getArticlesError, getArticlesLoading } from "../../store/articles/selectors";
import { requestArticlesData } from "../../store/articles/actions";

export const News = () => {
    const dispatch = useDispatch()
    const articles = useSelector(getArticlesList);
    const error = useSelector(getArticlesError);
    const loading = useSelector(getArticlesLoading);

    const reload = () => {
        dispatch(requestArticlesData())
    }

    // Я реализовал пагинированную подгрузку новостей 
    // Сначала подписываемся на скролл и изменение экрана
    useEffect(() => {
        // Сразу вопрос, я вообще в правильное место засунул подписки?
        window.addEventListener("scroll", checkTimer)
        window.addEventListener("resize", checkTimer)
        reload()
        
        return (() => {
            window.removeEventListener("scroll", checkTimer)
            window.removeEventListener("resize", checkTimer)
        })
    }, [])
    
    // При скролле срабатывает функция.
    // В ней я исскуственно притормаживаю вызов мидлвара для подгрузки постов
    // Это нужно, чтобы не стакались вызовы мидлвара на каждый пиксель прокрутки скролла)
    // Насколько правильно использовать интервалы для этой реализации? 
    let timer
    const checkTimer = () => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            // Вызываю отслеживание положения на странице
            checkPosition()
        }, 100)
    }

    // Отслеживание положения на странице и вызов мидлвара
    const checkPosition = () => {
        // Нам потребуется знать высоту документа и высоту экрана.
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight
      
        // Записываем, сколько пикселей пользователь уже проскроллил.
        const scrolled = window.scrollY
      
        // Обозначим порог, по приближении к которому
        // будем вызывать подгрузку новых новостей.
        // В нашем случае — треть экрана до конца страницы.
        const threshold = height - screenHeight / 3
      
        // Отслеживаем, где находится низ экрана относительно страницы.
        const position = scrolled + screenHeight
      
        // Если мы пересекли полосу-порог, подгружаем ещё данные.
        if (position >= threshold) {
            dispatch(requestArticlesData())
        }
    }

    return (
        <div className='containerNews'>
            <hr className='headerUnderLine' /> 
            <div className='headerAndProgress'>
                <h2 className='headerNews textColor'>News</h2>
                {loading && <CircularProgress className='circularProgress'/>}
            </div> 

            <hr className='headerUnderLine' />
            <div className='contentNews'>
                {error ? (       
                        <>
                            <h3 className='errorNewsContent'>Error: {error}</h3>
                            <button className='refreshNewsBtn' onClick={reload}>Refresh</button>
                        </>
                    ) : (            
                        articles?.map(item => (
                            <ul key={item.id}>
                                <li className='itemLi' >
                                    <article >
                                        <h4 className='itemArticle'>{item.title}</h4>
                                    </article>
                                </li>
                            </ul>

                        ))
                    )
                }
            </div>
        </div>
    )
}