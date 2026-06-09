import  s from "./App.module.css"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { selectThemeMode } from "@/app/appSlice.ts"
import { ErrorSnackBar } from "@/common/components"
import { Routing } from "@/common/routing"
import { useEffect, useState } from "react"
import { meTC } from "@/features/model/auth-slice.ts"
import { CircularProgress } from "@mui/material"



export const App = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(meTC())
      .unwrap()
      .finally(()=>{
        setIsInitialized(true)
      })
  }, [])


  if (!isInitialized) {
    return (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )

  }
  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
     <Routing/>


        <ErrorSnackBar/>
      </div>
    </ThemeProvider>
  )
}
