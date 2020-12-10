import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoLists: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void,
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTasksStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

export function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }
        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(task.id, e.currentTarget.checked, props.id)
        }

        return (

            <li key={task.id} className={`ullibtn  ${task.isDone ? "is-done" : ""}`}>
                <input
                    onChange={changeTasksStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <span>{task.title}</span>
                <button className="btnDelete" onClick={removeTask}>x</button>

            </li>
        )
    })


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        } else if (e.key === "Escape") {
            setTitle("")
        }
    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHeader = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoLists = () => {props.removeTodoLists(props.id)}

// Прив озникновении ошибки отресовать div

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoLists}>X</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onTitleChangeHandler}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""} // Условное присвоение класса, при возникновении ошибки
                />
                <button onClick={addTask}>Add Task</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div className="btn_3">
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHeader}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

//export default TodoList;
