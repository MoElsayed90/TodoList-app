
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
import ProductedRoute from "../auth/ProductedRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import Profile from "../pages/Profile";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey)
const userData = userDataString ? JSON.parse(userDataString) : null;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>

        <Route
          index
          element={
            <ProductedRoute isAllowed={userData} redicrectPath={"/login"} data={userData} >
              <HomePage />
            </ProductedRoute>
          } />
        <Route
          path="register"
          element={
            <ProductedRoute isAllowed={!userData} redicrectPath={"/login"} data={userData} >
              <RegisterPage />
            </ProductedRoute>

          } />
        <Route
          path="profile"
          element={
            <ProductedRoute isAllowed={userData} redicrectPath={"/login"} data={userData} >
              <Profile />
            </ProductedRoute>

          } />
        <Route
          path="login"
          element={
            <ProductedRoute isAllowed={!userData} redicrectPath={"/"} data={userData} >

              <Login />
            </ProductedRoute>

          } />
          <Route
          path="todos"
          element={
            <ProductedRoute isAllowed={userData} redicrectPath={"/login"} data={userData} >
              <Todos />
            </ProductedRoute>

          } />

      </Route>
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />

    </>
  )
);

export default router;