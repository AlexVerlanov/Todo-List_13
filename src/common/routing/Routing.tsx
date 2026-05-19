import { Main } from "@/app/Main"
import { Route, Routes } from "react-router"

import { PageNotFound } from "@/common/components"
import { Login } from "@/features/auth/ui/Login/Login.tsx"

export const Path = {
  Main: '/',
  Login: '/login',
  MotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Login} element={<Login />} />
    <Route path={Path.MotFound} element={<PageNotFound/>} />
  </Routes>
)