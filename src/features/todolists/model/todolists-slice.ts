import { createAsyncThunk, } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppsSlice } from "@/common/utils/createAppslice.ts"

export type FilterValues = "all" | "active" | "completed"
const initialState: DomainTodolist[] = []
export type DomainTodolist = Todolist & {filter: FilterValues}



export const todolistsSlice = createAppsSlice({
  name: "todolists",
  initialState,
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder)=>{
    builder
   /*   .addCase(fetchTodolistsTC.fulfilled,(_state, action)=>{
      return action.payload.map((tl) => ({ ...tl, filter: "all" }))
    })*/
      /*.addCase(fetchTodolistsTC.rejected,(_state, action:any)=>{
        alert(action.payload.message)
      })*/
      .addCase(changeTodolistTitleTC.fulfilled,(state, action:any)=>{
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTC.fulfilled ,(state,action)=>{
        state.unshift ({...action.payload,filter:'all'})
      })
      .addCase(deleteTodolistTC.fulfilled,(state,action)=>{
          const index = state.findIndex((todolist) => todolist.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        }

      )},
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
    ), }),
})
export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (arg:{id:string,title:string},{rejectWithValue}) => {
   try {
      await  todolistsApi.changeTodolistTitle(arg)
     return arg
   }catch(err){
     return rejectWithValue(err)
   }
  }
)
export const deleteTodolistTC = createAsyncThunk<{ id: string }, string>(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (id) => {
    await todolistsApi.deleteTodolist(id)
    return { id }
  }
)

export const createTodolistTC = createAsyncThunk (
  `${todolistsSlice.name}/createTodolistTC`,
  async (title:string) =>{
    const res = await todolistsApi.createTodolist(title)
    return res.data.data.item
  }
)

/*export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolistsTC`,
  async (_arg,{rejectWithValue}) => {
    try {
      const res = await todolistsApi.getTodolists()
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
})*/



export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const { deleteTodolistAC, changeTodolistFilterAC,fetchTodolistsTC
} = todolistsSlice.actions