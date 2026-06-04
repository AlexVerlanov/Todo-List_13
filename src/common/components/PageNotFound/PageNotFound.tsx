import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import Button from "@mui/material/Button"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>

    <Button
      component={Link}
      to="/"
      variant="contained"
      data-testid="page_not_found_button"
    >
     Вернуться на главную
    </Button>

  </>
)

