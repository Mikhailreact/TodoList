import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";

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
        <TextField
            variant={"outlined"}
            value={title}
            onChange={onTitleChangeHandler}
            onKeyPress={onKeyPressAddTask}
            label={"Title"}
            error={!!error}
            helperText={error}
        />
        {/*<input
            value={title}
            onChange={onTitleChangeHandler}
            onKeyPress={onKeyPressAddTask}
            className={error ? "error" : ""} // Условное присвоение класса, при возникновении ошибки
        />*/}
        {/* <button onClick={addTask}>Add Task</button>*/}



        <IconButton color={"primary"} onClick={addTask}>
            <AddBox/>
        </IconButton>
       {/* <Button onClick={addTask}
                variant={"contained"}
                color={"primary"}
        >+</Button>*/}
       {/* {error && <div className="error-message">{error}</div>}*/}
    </div>
}