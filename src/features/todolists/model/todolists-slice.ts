import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppsSlice } from "@/common/utils/createAppslice.ts"
import { changeStatusAC } from "@/app/appSlice.ts"
import { RequestStatus } from "@/common/types"
import { ResultCodeObj } from "@/common/enums"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { todolistSchema } from "@/features/todolists/api/schema.ts"
import * as z from "zod"
import { clearDataAC } from "@/common/actions"


export type FilterValues = "all" | "active" | "completed"
const initialState: DomainTodolist[] = []
export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
  // disable: boolean
}



export const todolistsSlice = createAppsSlice({
  name: "todolists",
  initialState,
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, () => {
      return []
    })
  },
  reducers: (create) => ({


    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),

    changeTodolistEntityStatusAC: create.reducer<{ id: string;entityStatus:RequestStatus  }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus
      }
    }),

    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    fetchTodolistsTC: create.asyncThunk(async (_arg,thunkAPI)=>{
        try {
          const res = await todolistsApi.getTodolists()

          const todolists = z.array(todolistSchema).parse(res.data)

          return { todolists }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      { fulfilled:(state, action)=>{
          action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all",entityStatus:'idle'})
            }
          )
        }
      }
    ),
    createTodolistTC:create.asyncThunk (
      async (args:{title:string},{ rejectWithValue,dispatch })=>{
        try {
          dispatch(changeStatusAC({status:'loading'}))
          const res = await todolistsApi.createTodolist(args.title)
          if(res.data.resultCode === ResultCodeObj.Success){
            dispatch(changeStatusAC({status:'succeeded'}))
            return res.data.data.item
          }else  {
            // const error = res.data.messages.length ? res.data.messages[0] : "something went wrong"
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }


        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
        },
      {
        fulfilled:(state, action)=>{
          state.unshift({...action.payload, filter: "all",entityStatus:'idle'})
        }
      }
      ),



changeTodolistTitleTC: create.asyncThunk(
  async (
    arg: { id: string; title: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      dispatch(changeStatusAC({ status: "loading" }))

      const res = await todolistsApi.changeTodolistTitle(arg)

      if (res.data.resultCode === ResultCodeObj.Success) {
        dispatch(changeStatusAC({ status: "succeeded" }))

        return {
          id: arg.id,
          title: arg.title,
        }
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
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      )

      if (todolist) {
        todolist.title = action.payload.title
      }
    },
  },
),

    deleteTodolistTC:create.asyncThunk(
      async (args:{ id: string },{rejectWithValue,dispatch})=>{
        try {
          dispatch(changeStatusAC({status:'loading'}))
          dispatch(changeTodolistEntityStatusAC({id: args.id,entityStatus:'loading'}))
          const res = await todolistsApi.deleteTodolist(args.id)

          dispatch(changeStatusAC({status:'succeeded'}))
          if (res.data.resultCode === 0) {
            return args
          } else {
            return rejectWithValue(res.data.messages)
          }
        } catch (error){
          dispatch(changeStatusAC({status:'failed'}))
          return rejectWithValue(error)
        }
      },{
        fulfilled:(state, action)=>{
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        }
      }
    )



  }),


})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists: selectTodolist } = todolistsSlice.selectors
export const { deleteTodolistAC,
  changeTodolistFilterAC,fetchTodolistsTC,
  createTodolistTC,changeTodolistTitleTC,deleteTodolistTC,changeTodolistEntityStatusAC
} = todolistsSlice.actions



