import React from "react"
import "./Task.css"
import { Link } from "react-router-dom"

export const TaskCard = ({ task }) => (
    <section className="task">
        <h3 className="task__name">
          <Link to={`/tasks/detail/${task.id}`}>
            { task.task }
          </Link>
        </h3>
    </section>
)