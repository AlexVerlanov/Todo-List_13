import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/model/auth-slice.ts"
import { Navigate } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"

export const FAQ = () => {
  const isLoggedIn  = useAppSelector(selectIsLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={Path.Login}/>
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 3 }}>
        FAQ
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="Как создать тудулист?"
            secondary="Введите название и нажмите кнопку добавления."
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Как удалить тудулист?"
            secondary="Нажмите кнопку удаления рядом с названием тудулиста."
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Как изменить тему?"
            secondary="Используйте переключатель в хедере."
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Как выйти из аккаунта?"
            secondary="Нажмите кнопку Logout."
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Где находится главная страница?"
            secondary="Главная страница находится по адресу /."
          />
        </ListItem>
      </List>
    </Container>
  )
}