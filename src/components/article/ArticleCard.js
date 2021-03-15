import React, {useContext} from "react"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"

export const ArticleCard = ({ article }) => {
    
    const { releaseArticle, setArticles } = useContext(ArticleContext)
    const history = useHistory()

    let handleRelease = () => {
        releaseArticle(article.id)
        .then(() => {
            history.push(`/articles`)
        })
    }

    let date = new Date(article.time)

return (
    <section className="article card">
        <h3 className="article__name">
                { article.title }
        </h3>
        <div className="article__url">{ article.url }</div>
        <div className="article__synopsis">{ article.synopsis }</div>
        <div className="article__date">{ date.toLocaleDateString() }</div>
        <button className="btn btn-primary" onClick={handleRelease}>Release Article</button>
        <button className="btn btn-secondary" onClick={() => {
            history.push(`/articles/edit/${article.id}`)
            }}>Edit
        </button>
    </section>
    )
}