import { useAppSelector } from "@/common/hooks"


import { TaskItem } from "./TaskItem/TaskItem"
import List from "@mui/material/List"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { selectFilteredTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {

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
            <TaskItem key={task.id} task={task} todolistId={todolist.id} />
          ))}
        </List>
      )}
    </>
  )
}
