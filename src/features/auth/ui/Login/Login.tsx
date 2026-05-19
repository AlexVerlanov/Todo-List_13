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
import { useForm } from "react-hook-form"


type LoginInputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  console.log('Login')
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const { register,handleSubmit } = useForm<LoginInputs>({ defaultValues:{email:'',password: '', rememberMe: false} })

  const onSubmit2 = (data:LoginInputs) => {
    console.log( data)
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
        <form onSubmit={handleSubmit(onSubmit2)}>
        <FormGroup>
          <TextField label="Email" margin="normal" {...register('email')}/>
          <TextField type="password" label="Password" margin="normal" {...register('password')}/>
          <FormControlLabel label="Remember me" control={<Checkbox  {...register('rememberMe')}
          />} />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </FormGroup>
          </form >
      </FormControl>
    </Grid>
  )
}