import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import { loginSchema } from "../components/validation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interface";
import { Login_FORM } from "../data";
import InputErrorMassage from "../components/InputErrorMassage";
// import { useNavigate } from "react-router-dom";
interface IFormInput {
  identifier: string;
  password: string;
}

const Login = () => {
  // const navigate  = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) })
  /** Handler */
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    setIsLoading(true)
    try {
      const { status , data:resData } = await axiosInstance.post("/auth/local/", data);
      console.log(resData)
      if (status == 200) {
        toast.success('Successfully login!', {
          position: "bottom-center",
          duration: 4000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          }
        })
        localStorage.setItem("loggedInUser",JSON.stringify(resData))
        setTimeout(()=>{
          location.replace('/')
        },2000)
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 4000,
        style: {
          backgroundColor: "purple",
          color: "white",
          width: "fit-content"
        }
      })
    } finally {
      setIsLoading(false)
    }
  }



  //** Rendered
  const renderLoginForm = Login_FORM.map(({ name, placeholder, type, validation }, idx) => (
    <div key={idx}>
      <Input className={""} type={type} placeholder={placeholder} {...register(name, validation)} />
      {errors[name] && <InputErrorMassage msg={errors[name]?.message} />}
    </div>
  ))
  return (
    <>
      <div className=" flex flex-col space-y-4  mt-48 max-w-md mx-auto">
        <h2 className="font-semibold text-3xl  capitalize text-center">
          login to get access !
        </h2>
        < form className="space-y-4 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
          {renderLoginForm}
          <Button fullWidth isLoading={isLoading}>Login</Button>
        </form>
      </div>
    </>
  )

}

export default Login;