import { useAppDispatch, useAppSelector } from "@/common/hooks"

import { TodolistItem } from "./TodolistItem/TodolistItem"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { fetchTodolistsTC, selectTodolist } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolist)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  return (
    <>
      {todolists.map((todolist) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} entityStatus={todolist.entityStatus} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
