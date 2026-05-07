import { useAppDispatch } from "@/common/hooks"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { RequestStatus } from "@/common/types"

type Props = {
  todolist: DomainTodolist
  entityStatus: RequestStatus
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      {/*NEED*/}
      <CreateItemForm onCreateItem={createTask}  entityStatus={todolist.entityStatus} />
      <Tasks todolist={todolist} entityStatus={todolist.entityStatus} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
