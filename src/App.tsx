import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};
export type FilterValuesType = "all" | "active" | "completed"


// это логика бизнес логига
function App() {
 // console.log(v1())
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "SaSS", isDone: true},
    ])
    // CRUD
    // - Create
    // - Read
    // - Update
    // - Delete
    const [filter, setFilter] = useState<FilterValuesType>("completed")

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    function addTask(title: string) {
        let newTask: TaskType = { id: v1(), title: title, isDone: false}
        setTasks( [newTask, ...tasks])
    }

    function changeTasksStatus (taskID: string, isDone: boolean) {
        const task: TaskType | undefined = tasks.find(task => task.id === taskID)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className="App">

            <TodoList title={"What to Learn. Victor"}
                      tasks={tasksForTodolist}
                      filter={filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTasksStatus={changeTasksStatus}
            />


        </div>
    );
}

export default App;
