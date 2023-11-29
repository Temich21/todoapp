import { IToDo } from "../../interfaces/IToDo"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IToDo[] = []

export const toDoSlice = createSlice({
    name: 'toDo',
    initialState,
    reducers: {
        // funkce pro pridani ukolu
        addToDo(state: IToDo[], action: PayloadAction<IToDo>) {
            state.push(action.payload)
        },
        // funkce pro smazani ukolu
        removeFromToDo(state: IToDo[], action: PayloadAction<number>) {
            return state.filter((todo: IToDo) => todo.id !== action.payload)
        },
        // funkce pro zmenu actualnosti ukolu
        comleteOrIncompleteToDo(state: IToDo[], action: PayloadAction<{ id: number; completed: boolean }>) {
            const todo = state.find((todo: IToDo) => todo.id === action.payload.id)
            if (todo) {
                todo.completed = action.payload.completed
            }
        },
        // funkce pro opravu 
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
        // filtrace dle aktualnosti ukolu
        filterByVisibilityToDo(state, action: PayloadAction<boolean>) {
            state.forEach((todo: IToDo) => todo.completed === action.payload ? todo.visible = true : todo.visible = false)
        },
        // filtrace dle aktualnosti ukolu
        makeVisibleAllToDo(state) {
            state.forEach((todo: IToDo) => todo.visible = true)
        },
        // smazat vsechny neaktualni ukoly
        removeAllCompleteToDo(state) {
            return state.filter((todo: IToDo) => !todo.completed)
        },
        // sortirovani seznamu
        sortToDo(state, action: PayloadAction<string>) {
            switch (action.payload) {
                case "time":
                    state.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
                    break
                case "additionOrder":
                    state.sort((a, b) => a.id - b.id)
                    break
                case "alphabetical":
                    state.sort((a, b) => a.task.toLowerCase().charCodeAt(0) - b.task.toLowerCase().charCodeAt(0))
                    break
                case "unalphabetical":
                    state.sort((a, b) => b.task.toLowerCase().charCodeAt(0) - a.task.toLowerCase().charCodeAt(0))
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