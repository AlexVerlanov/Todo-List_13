import { createSelector } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC, FilterValues } from "./todolists-slice"
import { RootState } from "@/app/store"
import { createAppsSlice } from "@/common/utils/createAppslice.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { ResultCodeObj, TaskStatus } from "@/common/enums"
import { changeStatusAC } from "@/app/appSlice.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"

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
      async (args: { todolistId: string; title: string }, { rejectWithValue,dispatch }) => {
        try {
          dispatch(changeStatusAC({status:'loading'}))
            const res = await tasksApi.createTask(args)
          if (res.data.resultCode === ResultCodeObj.Success){
            dispatch(changeStatusAC({status:'succeeded'}))
            return res.data.data.item
          }else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }

        } catch (error:any) {
          handleServerNetworkError(error, dispatch)
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
      async (args, { rejectWithValue,dispatch }) => {
        try {
          dispatch(changeStatusAC({status:'loading'}))
          const res = await tasksApi.deleteTask(args)
          dispatch(changeStatusAC({status:'succeeded'}))
          if (res.data.resultCode === ResultCodeObj.Success) {
            return args
          } else {
            return rejectWithValue(res.data.messages)
          }
        } catch (error) {
          dispatch(changeStatusAC({status:'failed'}))
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



    changeTaskTitleTC: create.asyncThunk(
      async (task: DomainTask, { rejectWithValue, dispatch }) => {
        try {
          dispatch(changeStatusAC({ status: 'loading' }))

          const res = await tasksApi.updateTask({
            ...task,
            title: task.title,
          })

          if (res.data.resultCode === ResultCodeObj.Success) {
            dispatch(changeStatusAC({ status: 'succeeded' }))

            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)

            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)

          return rejectWithValue(null)
        }
      },

      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId]?.find(
            (task) => task.id === action.payload.task.id,
          )

          if (task) {
            task.title = action.payload.task.title
          }
        },
      },
    ),

    updateTaskTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string, taskId: string,domainModel: Partial<UpdateTaskModel> }, { dispatch, getState, rejectWithValue },
      ) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const state = getState() as RootState
          const task = state.tasks[payload.todolistId].find(
            (t) => t.id === payload.taskId,
          )
          if (!task) {
            return rejectWithValue(null)
          }
          const updatedTask = {
            ...task,
            ...payload.domainModel,          }
          const res = await tasksApi.updateTask(updatedTask)

          if (res.data.resultCode === ResultCodeObj.Success) {
            dispatch(changeStatusAC({status:'succeeded'}))
            return {task: res.data.data.item}
          }else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }

        } catch (error:any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const updatedTask = action.payload.task

          const task = state[updatedTask.todoListId]?.find(
            (t) => t.id === updatedTask.id,
          )

          if (task) {
            Object.assign(task, updatedTask)
          }
        },
      },
    ),
    /*changeTaskTitleTC changeTaskStatusTC.*/

    changeTaskStatusTC: create.asyncThunk(
      async (task:DomainTask, { rejectWithValue ,dispatch}) => {
   /*     const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }*/
        try {
          dispatch(changeStatusAC({status:'loading'}))
          const res = await tasksApi.updateTask(task)
          dispatch(changeStatusAC({status:'succeeded'}))
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

  /*  changeTaskTitleAC: create.reducer<{
      todolistId: string
      taskId: string
      title: string
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find((task) => task.id === action.payload.taskId)

      if (task) {
        task.title = action.payload.title
      }
    }),*/
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

export const { createTaskTC, changeTaskStatusAC, changeTaskTitleTC, fetchTasks, deleteTaskTC, changeTaskStatusTC,updateTaskTC } =

  tasksSlice.actions

export const { selectTasks, selectTasksByTodolistId } = tasksSlice.selectors

export const selectFilteredTasks = (state: RootState, todolistId: string, filter: FilterValues) =>
  selectFilteredTasksBase(state.tasks, todolistId, filter)