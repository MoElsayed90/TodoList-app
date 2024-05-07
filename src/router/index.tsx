
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/Register";
import RootLayout from "../pages/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<RootLayout/>}>

      <Route
        path="register"
        element={<RegisterPage />} />
        </Route>
    </>
  )
);

export default router;