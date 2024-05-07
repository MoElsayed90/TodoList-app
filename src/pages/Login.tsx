import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  return (
    <>
      <div className=" flex flex-col space-y-4  mt-48 max-w-md mx-auto">
        <h2 className="font-semibold text-3xl  capitalize text-center">
          login to get access !
        </h2>
        <form className="space-y-4 flex flex-col w-full">
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize">Login</Button>
        </form>
      </div>
    </>
  )

}

export default Login;