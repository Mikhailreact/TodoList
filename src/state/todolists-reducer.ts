import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}
export type addTodolist = {
    type: "ADD-TODOLIST"
    title: string
}
export type changeTodoListTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    newTitle: string
    todoListID: string
}
export type changeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

type ActionType = RemoveTodoListActionType | addTodolist |
    changeTodoListTitle | changeTodoListFilter

export const todoListsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)

        case "ADD-TODOLIST":
            let todoList: TodolistType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [...state, todoList]

        case "CHANGE-TODOLIST-TITLE":
            const todolist = state.find(tl => tl.id === action.todoListID)
            if (todolist) {
                todolist.title = action.newTitle
                return [...state]
            }
            return state

        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.todoListID)
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            //return state
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todListID: string ):RemoveTodoListActionType => {
    // запрос на сервер.........
    return {
        type: "REMOVE-TODOLIST",
        todoListID: todListID
    }
}