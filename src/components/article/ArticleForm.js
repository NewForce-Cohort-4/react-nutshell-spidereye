import React, { useContext, useState, useEffect } from "react"
import { ArticleContext } from "../article/ArticleProvider"
import "./Article.css"
import { useHistory, useParams } from 'react-router-dom';

export const ArticleForm = () => {
    const { addArticle, updateArticle, getArticleById } = useContext(ArticleContext)

    //for edit, hold on to state of animal in this view
    const [article, setArticle] = useState({
      title: "",
      synopsis: "",
      url: "",
      time: Date.now()
    })
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {articleId} = useParams();
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newArticle = { ...article }
      //animal is an object with properties.
      //set the property to the new value
      newArticle[event.target.name] = event.target.value
      //update state
      setArticle(newArticle)
    }

    const handleSaveArticle = () => {
      if (article.title ===  "" || article.url === "" || article.synopsis === "") {
          window.alert("Please fill out all the required fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (articleId){
          //PUT - update
          updateArticle({
              id: article.id,
              userId: parseInt(article.userId),
              url: article.url,
              title: article.title,
              time: article.time,
              synopsis: article.synopsis
          })
          .then(() => history.push(`/articles/`))
        }else {
          //POST - add
          addArticle({
            id: article.id,
            userId: parseInt(localStorage.getItem("nutshell_user")),
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            time: Date.now()
          })
          .then(() => history.push("/articles"))
        }
      }
    }

    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        if (articleId){
          getArticleById(articleId)
          .then(article => {
              setArticle(article)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
    }, [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="articleForm">
        <h2 className="articleForm__title">Add Article</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="articleTitle">Title: </label>
            <input type="text" id="articleTitle" name="title" required autoFocus className="form-control"
            placeholder="Article Title"
            onChange={handleControlledInputChange}
            defaultValue={article.title}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="articleUrl">URL: </label>
            <input type="text" id="articleUrl" name="url" required autoFocus className="form-control"
            placeholder="URL"
            onChange={handleControlledInputChange}
            defaultValue={article.url}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="articleUrl">Synopsis: </label>
            <input type="text" id="articleSynopsis" name="synopsis" required autoFocus className="form-control"
            placeholder="Synopsis"
            onChange={handleControlledInputChange}
            defaultValue={article.synopsis}/>
          </div>
        </fieldset>
        
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveArticle()
          }}>
        {articleId ? <>Save Article</> : <>Save Article</>}</button>
      </form>
    )
}