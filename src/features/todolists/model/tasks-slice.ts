import { createSelector } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC, FilterValues } from "./todolists-slice"
import { RootState } from "@/app/store"
import { createAppsSlice } from "@/common/utils/createAppslice.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, type UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskPriority, TaskStatus } from "@/common/enums"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>

const initialState: TasksState = {}

export const tasksSlice = createAppsSlice({
  name: "tasks",
  initialState,
  selectors: {
    selectTasks: (state) => state,

    selectTasksByTodolistId: (state, todolistId: string) => state[todolistId] ?? [],
  },
  reducers: (create) => ({
    fetchTasks: create.asyncThunk(
      async (todolistId: string, { rejectWithValue }) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          debugger
          return { tasks: res.data.items, todolistId }
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (args: { todolistId: string; title: string }, { rejectWithValue }) => {
        try {
          const res = await tasksApi.createTask(args)
          debugger
          return res.data.data.item
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todoListId].unshift(action.payload)
        },
      },
    ),

    deleteTaskTC: create.asyncThunk<
      { todolistId: string; taskId: string },
      { todolistId: string; taskId: string },
      { rejectValue: string[] | null }
    >(
      async (args, { rejectWithValue }) => {
        try {
          const res = await tasksApi.deleteTask(args)
          if (res.data.resultCode === 0) {
            return args
          } else {
            return rejectWithValue(res.data.messages)
          }
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          if (!tasks) return
          const index = tasks.findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    /*   deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      if (!tasks) return

      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),*/

    /*   createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const newTask: DomainTask = {
        title: action.payload.title,
        status: TaskStatus.New,
        id: nanoid(),
        description: "",
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "",
        order: 0,
        addedDate: "",
      }

      state[action.payload.todolistId].unshift(newTask)
    }),*/

    changeTaskStatusTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; status: TaskStatus }, { rejectWithValue,getState }) => {
        const state = getState() as RootState
        const allTasks = state.tasks
        const tasksForTodolist = allTasks[args.todolistId]
        const newTask = tasksForTodolist.find((task)=>{
          return task.id === args.todolistId
        })
        debugger
        if (!newTask){
          return rejectWithValue(null)
        }
        const model: UpdateTaskModel = {
          description: newTask.description,
          title: newTask.title,
          status: args.status,
          priority: newTask.priority,
          startDate: newTask.startDate,
          deadline: newTask.deadline,
        }
        try {
          const res = await tasksApi.updateTask({ todolistId: args.todolistId, taskId: args.taskId, model })
          debugger
          return {task: res.data.data.item}
        } catch (error) {
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId]?.find((task) => task.id === action.payload.task.id)

          if (task) {
            task.status = action.payload.task.status
          }
        },
      },
    ),

    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; status: TaskStatus }>((state, action) => {
      const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)
      if (task) {
        task.status = action.payload.status
      }
    }),

    changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)

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
        return tasks.filter((task) => task.status === TaskStatus.New)
      case "completed":
        return tasks.filter((task) => task.status === TaskStatus.Completed)
      default:
        return tasks
    }
  },
)

export const tasksReducer = tasksSlice.reducer

export const { createTaskTC, changeTaskStatusAC, changeTaskTitleAC, fetchTasks, deleteTaskTC, changeTaskStatusTC } =
  tasksSlice.actions

export const { selectTasks, selectTasksByTodolistId } = tasksSlice.selectors

export const selectFilteredTasks = (state: RootState, todolistId: string, filter: FilterValues) =>
  selectFilteredTasksBase(state.tasks, todolistId, filter)