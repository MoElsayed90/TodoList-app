
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<h3>home</h3>} />
      <Route
        path="register"
        element={<RegisterPage />} />
    </>
  )
);

export default router;