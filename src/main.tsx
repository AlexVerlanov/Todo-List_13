import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { App } from "@/app/App.tsx"
import { BrowserRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.PROD ? "/Todo-List_13" : "/"}>
      <App />
    </BrowserRouter>

  {/*  <AppHttpRequests />*/}
  </Provider>,
)
