import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import styles from "./TodolistTitle.module.css"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title,entityStatus } = todolist

const [deleteTodolist] = useDeleteTodolistMutation()
const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const deleteTodolistHandler = () => {
    // dispatch(deleteTodolistTC({ id } ))
    deleteTodolist(id)
  }

  const changeTodolistTitleHandler = (title: string) => {
    // dispatch(changeTodolistTitleTC({ id, title }))
    changeTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} entityStatus={todolist.entityStatus} />
      </h3>
      <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
