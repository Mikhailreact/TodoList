import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoLists: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    addTask: (title: string, todoListID: string) => void,
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTasksStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.id)
        }
        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (newValue: string) => {
           props.changeTaskTitle(task.id, newValue, props.id)
        }

        return (

            <li key={task.id} className={`ullibtn  ${task.isDone ? "is-done" : ""}`}>
                <input
                    onChange={changeTasksStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <EditableSpan title={task.title}
                              onChange={changeTaskTitle}
                />
                <button className="btnDelete" onClick={removeTask}>x</button>

            </li>
        )
    })

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHeader = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoLists = () => {
        props.removeTodoLists(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={removeTodoLists}>X</button>
            </h3>
            <AddItemForm  addItem={addTask}/>
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






















