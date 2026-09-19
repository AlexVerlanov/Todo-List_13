
import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"
import { useState } from "react"

export const Todolists = () => {
  const [skip,setSkip] = useState (true)
  const {data} = useGetTodolistsQuery(undefined, {skip})
  console.log()
  // const todolists = useAppSelector(selectTodolist)
  //
  // const dispatch = useAppDispatch()
  //
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [dispatch])
const onClickHandler= ()=>{
  setSkip(false)
}
  return (
    <>
      <button onClick={onClickHandler}>get todolist</button>
      {data?.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} entityStatus={todolist.entityStatus} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
