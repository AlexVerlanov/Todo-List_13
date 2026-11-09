import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { getListItemSx } from "./TaskItem.styles"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { RequestStatus } from "@/common/types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/_tasksApi.ts"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  entityStatus: RequestStatus

}

export const TaskItem = ({ task, todolist ,entityStatus }: Props) => {

  const [updateTask] = useUpdateTaskMutation()
  const [deleteTaskMutation] = useDeleteTaskMutation()


  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {

    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    updateTask({ taskId: task.id, todolistId: todolist.id, model })

  }
  const changeTaskTitle = (title: string) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }

    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

const  deleteTaskHandler   = () => {
  deleteTaskMutation({ todolistId:todolist.id, taskId:task.id })
}

  const checked = task.status === TaskStatus.Completed
  return (
    <ListItem sx={getListItemSx(checked)}>
      <div>
        <Checkbox checked={checked} onChange={changeTaskStatus} disabled={entityStatus === 'loading'}/>
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
        <span style={{fontSize:"12px", marginLeft: "10px",    color: "orange",}}>{new Date(task.addedDate).toLocaleDateString()}</span>
      </div>
      <IconButton onClick={deleteTaskHandler } disabled={entityStatus === 'loading'}>
        <DeleteIcon  />
      </IconButton>
    </ListItem>
  )
}
