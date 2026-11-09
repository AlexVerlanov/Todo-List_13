import { FilterButtons } from "./FilterButtons/FilterButtons"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { RequestStatus } from "@/common/types"
import { useCreateTaskMutation } from "@/features/todolists/api/_tasksApi.ts"

type Props = {
  todolist: DomainTodolist
  entityStatus: RequestStatus
}



export const TodolistItem = ({ todolist }: Props) => {

  const  [createTaskMutation]= useCreateTaskMutation()


  const createTaskHandler = () => {
    createTaskMutation({todolistId: todolist.id, title: todolist.title})
  }


  return (
    <div>
      <TodolistTitle todolist={todolist} />
      {/*NEED*/}
      <CreateItemForm onCreateItem={createTaskHandler}  entityStatus={todolist.entityStatus} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
