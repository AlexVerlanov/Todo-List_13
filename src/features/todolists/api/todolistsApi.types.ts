import { RequestStatus } from "@/common/types"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
  entityStatus:RequestStatus
}
