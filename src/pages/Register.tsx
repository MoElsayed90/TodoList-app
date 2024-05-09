/* eslint-disable no-useless-escape */
import { REGISTER_FORM } from "../data";
import InputErrorMassage from "../components/InputErrorMassage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterSchema } from "../components/validation";
import axiosInstance from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}


const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(RegisterSchema) })
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data)
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
        if(status == 200){
          toast.success('Successfully created!',{
            position:"bottom-center",
            duration:4000,
            style:{
              backgroundColor:"black",
              color:"white",
              width: "fit-content"
            }
          })
        }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(errors)

  //** Rendered
  const renderRegisterForm = REGISTER_FORM.map(({ name, placeholder, type, validation }, idx) => (
    <div key={idx}>
      <Input type={type} placeholder={placeholder} {...register(name, validation)} />
      {errors[name] && <InputErrorMassage msg={errors[name]?.message} />}
    </div>
  ))
  return (
    <>
      <div className=" flex flex-col space-y-4  mt-48 max-w-md mx-auto">
        <h2 className="font-semibold text-3xl  capitalize text-center">
          register to get access !
        </h2>
        <form className="space-y-4 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
          {renderRegisterForm}


          <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize" type="submit">register</Button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default RegisterPage;
