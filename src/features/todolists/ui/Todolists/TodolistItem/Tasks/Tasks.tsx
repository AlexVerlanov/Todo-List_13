import { useAppDispatch, useAppSelector } from "@/common/hooks"


import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { fetchTasks, selectFilteredTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { RequestStatus } from "@/common/types"

type Props = {
  todolist: DomainTodolist
  entityStatus: RequestStatus
}

export const Tasks = ({ todolist }: Props) => {
  const { id,entityStatus  } = todolist
    const dispatch = useAppDispatch()

   useEffect(() => {
     dispatch(fetchTasks(id))
   }, [])
  const filteredTasks = useAppSelector((state) =>
    selectFilteredTasks(state, todolist.id, todolist.filter)
  )

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={todolist.id}  entityStatus={entityStatus}/>
          ))}
        </List>
      )}
    </>
  )
}
