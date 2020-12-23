import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

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
                <Checkbox
                    color={"secondary"}
                    onChange={changeTasksStatus}
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>
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
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/* <button onClick={removeTodoLists}>X</button>*/}
                <IconButton onClick={removeTodoLists}
                ><Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyleType: "none", padding: "0"}}>
                {tasks}
            </ul>
            <div style={{textAlign: "center"}}>
                <ButtonGroup size={"small"} color={"primary"}>
                    <Button
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={onActiveClickHeader}>Active
                    </Button>
                    <Button
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}






















