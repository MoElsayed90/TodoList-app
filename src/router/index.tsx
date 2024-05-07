
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";
import Login from "../pages/Login";
import Todos from "../pages/Todos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout/>}>

      <Route
        path="register"
        element={<RegisterPage />} />
      <Route
        path="login"
        element={<Login />} />
      <Route
        path="home"
        element={<Todos />} />
        </Route>
    </>
  )
);

export default router;