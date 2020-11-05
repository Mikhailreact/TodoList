import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void ,
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    changeTasksStatus: (taskID: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)




    const tasks = props.tasks.map(task => {
        const removeTask = () => { props.removeTask(task.id) }
        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeTasksStatus(task.id, e.currentTarget.checked)}

        return (

            <li key={task.id} className={ `ullibtn  ${task.isDone ? "is-done" : ""}` }>
                <input
                    onChange= {changeTasksStatus}
                    type="checkbox"
                    checked={ task.isDone }
                />
                <span>{ task.title  }</span>
                <button className="btnDelete" onClick={ removeTask }>x</button>

            </li>
        )
    })


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask()
        } else if( e.key === "Escape" ){
                setTitle("")
        }
    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setError(null);
        setTitle(e.currentTarget.value)
    }
    const onAllClickHandler = () =>  { props.changeFilter ("all" )}
    const onActiveClickHeader =() => { props.changeFilter ("active" )}
    const onCompletedClickHandler = () => {props.changeFilter ("completed" )}


// Прив озникновении ошибки отресовать div

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onTitleChangeHandler}
                    onKeyPress={ onKeyPressAddTask }
                    className={error ? "error" : ""} // Условное присвоение класса, при возникновении ошибки
                />
                <button onClick={ addTask }>Add Task</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul >
                {tasks}
            </ul>
            <div className="btn_3">
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={ onAllClickHandler }>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={ onActiveClickHeader }>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={ onCompletedClickHandler }>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;
