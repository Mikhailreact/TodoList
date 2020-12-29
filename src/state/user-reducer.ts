export type StateType = {
    name: string
    age: number
    childrenCount: number

}
// 3 типа деиствия: action type!!!
// Описание или тип действия и (возможно!!!) какието праметры

type ActionType = {
    type: string
    [key: string]: any // [key: string] - мы не знаем что будет
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type){
        case 'INCREMENT-AGE':
            const newState = {...state}
            newState.age = state.age +1
            console.log(newState)
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount +1}
        case 'CHANGE-NAME':
            return {...state, name: action.newName}
        default:
            //return state
            throw new Error("I don't understand this type")
    }
}
