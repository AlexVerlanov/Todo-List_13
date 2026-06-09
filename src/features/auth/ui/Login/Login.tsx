import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from "@mui/material/Grid2"
import TextField from '@mui/material/TextField'
import { selectThemeMode } from "@/app/appSlice.ts"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoginInputs, loginSchema } from "@/features/auth/model/shema.ts"
import { loginTC, meTC, selectIsLoggedIn } from "@/features/model/auth-slice.ts"
import { Navigate, useNavigate } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"




export const Login = () => {
  console.log('Login')
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const   dispatch  = useAppDispatch()

  let navigate = useNavigate()

  const theme = getTheme(themeMode)

  const { handleSubmit,formState:{errors},reset,control } =


    useForm<LoginInputs>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "alexverlanov2020@gmail.com",
        password: "123",
        rememberMe: false,
      },
    })


  const onSubmit : SubmitHandler<LoginInputs> = (data) => {
    dispatch(loginTC(data))
      .unwrap()
      .then(() => {
        dispatch(meTC())
      })

  }

  // if (isLoggedIn){
  //  return <Navigate to={Path.Main}/>
  //    }
  return (
    <Grid container justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <FormControlLabel label="Remember me" control={ <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />} />
          <hr/>
          <hr/>

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
          </form >
      </FormControl>
    </Grid>
  )
}