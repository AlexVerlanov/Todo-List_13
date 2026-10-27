import { changeStatusAC, changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/appSlice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import { getTheme } from "@/common/theme"
import { NavButton } from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { LinearProgress } from "@mui/material"
import { Link as RouterLink } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { changeIsLoggedInAc, logoutTC, selectIsLoggedIn, selectLogin } from "@/features/model/auth-slice.ts"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCodeObj } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const login = useAppSelector(selectLogin)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)


  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

const [logout] = useLogoutMutation()

  const changeMode = () => {
  let ac=   changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" })
    dispatch(ac)
  }

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then((data) => {
        if (data.resultCode === ResultCodeObj.Success) {
          localStorage.removeItem(AUTH_TOKEN)
          dispatch(changeIsLoggedInAc({isLoggedIn: false}))
        }
      })
      // .catch((error) => {
      //   console.error("Logout error:", error)
      // })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && (
              <>
                <span style={{ marginRight: "15px" }}>Привет, {login}👋</span>
                <NavButton onClick={logoutHandler}>Logout</NavButton>
              </>
            )}

            <RouterLink to={Path.Main}>
              <NavButton>
                Main
              </NavButton>
            </RouterLink>

            <RouterLink to={Path.Faq}>
              <NavButton background={theme.palette.primary.dark}>
                FAQ
              </NavButton>
            </RouterLink>

            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>

      { status === 'loading'  && <LinearProgress /> }
    </AppBar>
  )
}
