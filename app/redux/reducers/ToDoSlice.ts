import { IToDo } from "../../interfaces/IToDo"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IToDo[] = []

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        addToDo(state: IToDo[], action: PayloadAction<IToDo>) {
            state.push(action.payload)
        },
        removeFromToDo(state: IToDo[], action: PayloadAction<number>) {
            return state.filter((todo: IToDo) => todo.id !== action.payload)
        },
        comleteOrIncompleteToDo(state: IToDo[], action: PayloadAction<{ id: number; completed: boolean }>) {
            const todo = state.find((todo: IToDo) => todo.id === action.payload.id)
            if (todo) {
                todo.completed = action.payload.completed
            }
        },
        updateToDo(state: IToDo[], action: PayloadAction<IToDo>) {
            const todo = state.find((todo: IToDo) => todo.id === action.payload.id)
            if (todo) {
                todo.title = action.payload.title
                todo.text = action.payload.text
                todo.time = action.payload.time
                todo.priority = action.payload.priority
            }
        },
        updateTasksOrder: (state: IToDo[], action) => {
            const { sourceIndex, destinationIndex } = action.payload
            const [removed] = state.splice(sourceIndex, 1) // Destructure to get the first element
            state.splice(destinationIndex, 0, removed)
        },
        filterByVisibilityToDo(state: IToDo[], action: PayloadAction<boolean>) {
            state.forEach((todo: IToDo) => todo.completed === action.payload ? todo.visible = true : todo.visible = false)
        },
        makeVisibleAllToDo(state: IToDo[]) {
            state.forEach((todo: IToDo) => todo.visible = true)
        },
        removeAllCompleteToDo(state: IToDo[]) {
            return state.filter((todo: IToDo) => !todo.completed)
        },
        sortToDo(state: IToDo[], action: PayloadAction<string>) {
            switch (action.payload) {
                case "Time Ascending":
                    state.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
                    break
                case "Time Descending":
                    state.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
                    break
                case "Alphabetical":
                    state.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
                    break;
                case "Unalphabetical":
                    state.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
                    break;
                case "Priority Ascending":
                    state.sort((a, b) => Number(b.priority.split(' ')[1]) - Number(a.priority.split(' ')[1]))
                    break
                case "Priority Descending":
                    state.sort((a, b) => Number(a.priority.split(' ')[1]) - Number(b.priority.split(' ')[1]))
                    break
            }
        }
    }
})

export const {
    addToDo,
    removeFromToDo,
    updateToDo,
    comleteOrIncompleteToDo,
    updateTasksOrder,
    filterByVisibilityToDo,
    makeVisibleAllToDo,
    removeAllCompleteToDo,
    sortToDo
} = toDoSlice.actions
export default toDoSlice.reducer