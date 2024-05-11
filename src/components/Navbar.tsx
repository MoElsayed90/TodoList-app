import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/TODO LIST Logo - BigCommerce Store Logo with Transparent Background.png"
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation()
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const Logout = () => {
    localStorage.removeItem(storageKey)
    setTimeout(() => {
      location.replace(pathname)
    }, 1500);
  }
  return (
    <>
      <div className="navbar bg-neutral-500  ">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl"><img src={Logo} alt="Todo List Logo" className="w-32 h-6" /></a>

        </div>
        <div className="navbar-center">
          {
            userData ? (<>
              <div className="hidden md:flex font-semibold  md:justify-between md:items-center  ">
                <ul className="menu menu-horizontal space-x-4 bg-none text-base ">
                  <li><NavLink to={"/"}>Home</NavLink></li>
                  <li><NavLink to={"/"}>Portfolio</NavLink></li>
                  <li><NavLink to={"/"} onClick={Logout}>Logout</NavLink></li>
                </ul>
              </div>
            </>
            ) : (
              <div className="hidden md:flex font-semibold   md:justify-between px-10 md:items-center">
                <ul className="menu menu-horizontal  text-base">
                  <li><NavLink to={"/"}>Home</NavLink></li>
                  <li><NavLink to={"/Register"}>Register</NavLink></li>
                  <li><NavLink to={"/login"}>Login</NavLink></li>
                </ul>
              </div>
            )
          }


        </div>
        <div className="navbar-end ">
          {
            userData ?
              <div className="navbar-end md:flex hidden px-8">

                <Button variant="default" size={"sm"} className="w-20 h-8 "> {userData.user.username}</Button>
              </div> : null
          }
          <div className="dropdown md:hidden  dropdown-bottom dropdown-end flex justify-center items-center space-x-2 ">

            {
              userData ? <>
                <div tabIndex={0} role="button" >
                  <Button variant="default" size={"sm"} className="w-20 h-8"> {userData.user.username}</Button>
                </div>
                <ul tabIndex={0} className=" menu menu-sm dropdown-content  mt-5 z-[1] p-2 shadow rounded-box w-52 bg-slate-300">
                  <li><a href="">Homepage</a></li>
                  <li><a>Portfolio</a></li>
                  <li><a onClick={Logout}>Logout</a></li>
                </ul></> : <>  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </div>
                <ul tabIndex={0} className=" menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow rounded-box w-52 bg-slate-300">
                  <li><a>Homepage</a></li>
                  <li><a>Login</a></li>
                  <li><a>Register</a></li>
                </ul></>
            }

          </div>

        </div>
      </div>
    </>
  )

}

export default Navbar;