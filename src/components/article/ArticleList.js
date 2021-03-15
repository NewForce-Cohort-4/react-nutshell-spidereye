import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
  const { articles, getArticlesById} = useContext(ArticleContext)

  // Since you are no longer ALWAYS displaying all of the articles
  const [ filteredArticles, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getArticlesById()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  useEffect(() => {
    const sortedArticles = articles.sort((a, b) => b.time - a.time)

    setFiltered(sortedArticles)
  }, [articles])

  return (
    <>
      <h1>Articles</h1>

      <button className="btn btn-primary" onClick={() => history.push("/articles/create")}>
          Add New Article
      </button>
      <div className="articles">
      {
        filteredArticles.map(article => {
          return (
          <ArticleCard key={article.id} article={article} />
          )
        })
      }
      </div>
    </>
  )
}