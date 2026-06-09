import { Main } from "@/app/Main"
import {  Route, Routes } from "react-router"

import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components"
import { ProtectedRoutes } from "../ProtectedRoutes"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/model/auth-slice.ts"
import { FAQ } from "@/features/faq/ui/FAQ.tsx"

export const Path = {
  Main: '/',
  Login: '/login',
  Faq: "/faq",
  NotFound: '/*',
} as const



export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoutes isAllowed={isLoggedIn} />}>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<FAQ />} />
      </Route>

      <Route element={<ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}