import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateTape = {
    [key: string]: Array<TaskType>
}

// это логика бизнес логига
function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodolistType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateTape>({
            [todoListID1]: [
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "SaSS", isDone: true},
            ],
            [todoListID2]: [
                {id: v1(), title: "Beer", isDone: false},
                {id: v1(), title: "Fish", isDone: true},
                {id: v1(), title: "Chips", isDone: true},
            ]
        }
    )

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoList([...todoLists])
        }
    }

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        /*const todoListTasks = tasks[todoListID]
        todoListTasks.filter(t => t.id !== taskID)*/
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeTasksStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodoLists(todoListID: string) {
        setTodoList(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    return (
        <div className="App">

            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                    }
                    return(
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTasksStatus={changeTasksStatus}
                            removeTodoLists={removeTodoLists}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;












