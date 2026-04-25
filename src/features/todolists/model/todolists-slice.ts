import { createAsyncThunk, } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppsSlice } from "@/common/utils/createAppslice.ts"
import { changeStatusAC } from "@/app/app-reducer.ts"


export type FilterValues = "all" | "active" | "completed"
const initialState: DomainTodolist[] = []
export type DomainTodolist = Todolist & {filter: FilterValues}



export const todolistsSlice = createAppsSlice({
  name: "todolists",
  initialState,
  selectors: {
    selectTodolists: (state) => state,
  },

  reducers: (create) => ({

    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
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
          return { todolists: res.data }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      { fulfilled:(state, action)=>{
          action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all" })
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
          dispatch(changeStatusAC({status:'succeeded'}))
          return res.data.data.item

        } catch (error) {
          dispatch(changeStatusAC({status:'failed'}))
          return rejectWithValue(null)
        }
        },
      {
        fulfilled:(state, action)=>{
          state.unshift({...action.payload, filter: "all"})
        }
      }
      ),


    changeTodolistTitleTC:create.asyncThunk(
      async (arg:{id:string,title:string},{rejectWithValue,dispatch})=>{
        try {
          dispatch(changeStatusAC({status:'loading'}))
          await  todolistsApi.changeTodolistTitle(arg)
          dispatch(changeStatusAC({status:'succeeded'}))
          return arg
        }catch(err){
          dispatch(changeStatusAC({status:'failed'}))

          return rejectWithValue(err)
        }

      },
      {
        fulfilled:(state, action)=>{
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state[index].title = action.payload.title
        }
      }
      }
    ),

    deleteTodolistTC:create.asyncThunk(
      async (args:{ id: string },{rejectWithValue,dispatch})=>{
        try {
          dispatch(changeStatusAC({status:'loading'}))
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
// export const createTodolistTC = createAsyncThunk (
//   `${todolistsSlice.name}/createTodolistTC`,
//   async (title:string,{dispatch}) =>{
//     dispatch(changeStatusAC({status:'loading'}))
//     const res = await todolistsApi.createTodolist(title)
//     dispatch(changeStatusAC({status:'succeeded'}))
//     return res.data.data.item
//   }
// )

/*export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (arg:{id:string,title:string},{rejectWithValue}) => {
   try {
      await  todolistsApi.changeTodolistTitle(arg)
     return arg
   }catch(err){
     return rejectWithValue(err)
   }
  }
)*/
/*export const deleteTodolistTC = createAsyncThunk<{ id: string }, string>(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id) => {
    await todolistsApi.deleteTodolist(id)
    return { id }
  }
)*/

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const { deleteTodolistAC,
  changeTodolistFilterAC,fetchTodolistsTC,
  createTodolistTC,changeTodolistTitleTC,deleteTodolistTC
} = todolistsSlice.actions



