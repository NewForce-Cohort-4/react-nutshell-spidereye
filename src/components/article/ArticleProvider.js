import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data. A context stores a certain kind of data to be used in your application. Therefore, when you create a dta provider component in React you need to create a context. Nothing is stored in the context when it's defined. At this point, it's just an empty warehouse waiting to be filled.
export const ArticleContext = createContext()

// This component establishes what data can be used
export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getArticles = () => {
        return fetch("http://localhost:8088/articles")
        .then(res => res.json())
        .then(setArticles)
    }

    const addArticle = articleObj => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleObj)
        })
        .then(response => response.json())
    }

    const userId = localStorage.getItem("nutshell_user")

    const getArticlesById = () => {
        return fetch(`http://localhost:8088/articles?userId=${userId}`)
            .then(res => res.json())
            .then(setArticles)
    }

    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/articles/${id}`)
            .then(res => res.json())
    }

    const releaseArticle = articleId => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
            .then(getArticlesById)
    }

    const updateArticle = article => {
        return fetch(`http://localhost:8088/articles/${article.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(article)
        })
          .then(getArticles)
      }

        // You return a context provider which has the 'animals' state, 'getAnimals' function, anmd the 'addAnimal' function as keys. This allows any child elements to access them.
        return (
            <ArticleContext.Provider value={{
                articles, getArticles, addArticle, getArticlesById, getArticleById, releaseArticle, updateArticle, searchTerms, setSearchTerms
            }}>
                {props.children}
            </ArticleContext.Provider>
        )
}