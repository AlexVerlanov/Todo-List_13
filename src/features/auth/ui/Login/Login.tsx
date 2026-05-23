import { useAppSelector } from "@/common/hooks"
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
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginInputs } from "@/features/auth/model/types.ts"




const LoginSchema = z.object({
  email: z.string().email("Incorrect email"),
  password:z.string().min(3, 'Das Passwort muss länger als 3 Zeichen sein.'),
  rememberMe:z.boolean(),
})


export const Login = () => {
  console.log('Login')
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const { handleSubmit,formState:{errors},reset,control } =


    useForm<LoginInputs>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
    })


  const onSubmit : SubmitHandler<LoginInputs> = (data) => {
    console.log( data)
    reset()
  }
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