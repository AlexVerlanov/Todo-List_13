import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts"

export const Todolists = () => {

  const {data} = useGetTodolistsQuery()
  console.log()

  return (
    <>

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
