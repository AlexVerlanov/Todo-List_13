import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistsApi"

export const Main = () => {

     const [trigger, res] = useCreateTodolistMutation()
  console.log(res)
  const createTodolist = (title: string) => {
    trigger(title)
    // dispatch(createTodolistTC({ title }))
  }

  // const navigate = useNavigate()


  // useEffect(() => {
  //   if (!isLoggedIn){
  //     navigate(Path.Login)
  //   }
  // },[isLoggedIn])



  // if (!isLoggedIn){
  //   return <Navigate to={Path.Login}/>
  // }
  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        {/*Nein*/}
        <CreateItemForm onCreateItem={createTodolist}  />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
