import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string,) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        } else if (e.key === "Escape") {
            setTitle("")
        }
    }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle,)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }


    return <div>
        <input
            value={title}
            onChange={onTitleChangeHandler}
            onKeyPress={onKeyPressAddTask}
            className={error ? "error" : ""} // Условное присвоение класса, при возникновении ошибки
        />
        <button onClick={addTask}>Add Task</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}