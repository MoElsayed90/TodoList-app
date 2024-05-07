
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";
import Login from "../pages/Login";
import Todos from "../pages/Todos";
import HomePage from "../pages";
import PageNotFound from "../pages/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout/>}>

          <Route
            index
            element={<HomePage/>} />
      <Route
        path="register"
        element={<RegisterPage />} />
      <Route
        path="login"
        element={<Login />} />
      <Route
        path="todos"
        element={<Todos />} />
        </Route>
           {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    
    </>
  )
);

export default router;