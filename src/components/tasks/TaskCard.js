import React from "react"
import "./Task.css"
import { Link } from "react-router-dom"

export const TaskCard = ({ tasks }) => (
    <section className="task">
        <h3 className="task__name">
          <Link to={`/tasks/detail/${tasks.id}`}>
            { tasks.name }
          </Link>
        </h3>
    </section>
)