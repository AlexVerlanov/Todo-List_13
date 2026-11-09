import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useGetTasksQuery } from "@/features/todolists/api/_tasksApi.ts"
import { TaskStatus } from "@/common/enums"

type Props = {
  todolist: DomainTodolist
  // entityStatus: RequestStatus
}

export const Tasks = ({ todolist}: Props) => {
  const { id, entityStatus, filter } = todolist

   const { data, isLoading, isError } = useGetTasksQuery(id)
  let filteredTasks = data?.items




  if (filter === "active") {
    filteredTasks = filteredTasks?.filter(
      (task) => task.status === TaskStatus.New
    )
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter(
      (task) => task.status === TaskStatus.Completed
    )
  }
  return (
    <>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : isError ? (
        <p>Ошибка загрузки задач</p>
      ) : filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              todolist={todolist}
              entityStatus={entityStatus}
            />
          ))}
        </List>
      )}
    </>
  )
}
