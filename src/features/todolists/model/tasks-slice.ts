import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC,  deleteTodolistTC } from "./todolists-slice"
import { RootState } from "@/app/store"
import { FilterValues } from "./todolists-slice"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>

const initialState: TasksState = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  selectors: {
    selectTasks: (state) => state,

    selectTasksByTodolistId: (state, todolistId: string) =>
      state[todolistId] ?? [],
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId]
        if (!tasks) return

        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      }
    ),

    createTaskAC: create.reducer<{ todolistId: string; title: string }>(
      (state, action) => {
        const newTask: Task = {
          id: nanoid(),
          title: action.payload.title,
          isDone: false,
        }

        state[action.payload.todolistId].unshift(newTask)
      }
    ),

    changeTaskStatusAC: create.reducer<{
      todolistId: string
      taskId: string
      isDone: boolean
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find(
        (task) => task.id === action.payload.taskId
      )

      if (task) {
        task.isDone = action.payload.isDone
      }
    }),

    changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find(
        (task) => task.id === action.payload.taskId
      )

      if (task) {
        task.title = action.payload.title
      }
    }),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

const selectFilteredTasksBase = createSelector(
  [
    (state: TasksState, todolistId: string) => state[todolistId] ?? [],
    (_state: TasksState, _todolistId: string, filter: FilterValues) => filter,
  ],
  (tasks, filter) => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.isDone)
      case "completed":
        return tasks.filter((task) => task.isDone)
      default:
        return tasks
    }
  }
)

export const tasksReducer = tasksSlice.reducer

export const {
  deleteTaskAC,
  createTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} = tasksSlice.actions

export const { selectTasks, selectTasksByTodolistId } = tasksSlice.selectors

export const selectFilteredTasks = (
  state: RootState, todolistId: string,
  filter: FilterValues) => selectFilteredTasksBase(state.tasks, todolistId, filter)