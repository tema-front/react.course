import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getArticlesList, getArticlesError, getArticlesLoading } from "../../store/articles/selectors";
import { requestArticlesData } from "../../store/articles/actions";
import { Header } from "../Header";

export const News = () => {
    const dispatch = useDispatch()
    const articles = useSelector(getArticlesList);
    const error = useSelector(getArticlesError);
    const loading = useSelector(getArticlesLoading);

    const reload = () => {
        dispatch(requestArticlesData())
    }

    useEffect(() => {
        window.addEventListener("scroll", checkTimer)
        window.addEventListener("resize", checkTimer)
        reload()
        
        return (() => {
            window.removeEventListener("scroll", checkTimer)
            window.removeEventListener("resize", checkTimer)
        })
    }, [])
    
    let timer
    const checkTimer = () => {
        clearTimeout(timer)

        timer = setTimeout(() => {
            checkPosition()
        }, 100)
    }

    const checkPosition = () => {
        const height = document.body.offsetHeight
        const screenHeight = window.innerHeight
        const scrolled = window.scrollY
        const threshold = height - screenHeight / 3
      
        const position = scrolled + screenHeight
      
        if (position >= threshold) {
            dispatch(requestArticlesData())
        }
    }

    return (
        <div className='container'>

            <Header headerName='News' loading={loading} />

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