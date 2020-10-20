import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
};
export type FilterValuesType = "all" | "active" | "completed"


// это логика
function App() {
    const array = useState<Array<TaskType>>([
        {id: 1, title: "React", isDone: false},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "CSS", isDone: true},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "SaSS", isDone: true},
    ])
    let tasks = array[0]
    let setTasks = array[1]

    const [filter, setFilter] = useState<FilterValuesType>("completed")

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
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
            <TodoList title={"What to Learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>


        </div>
    );
}

export default App;
