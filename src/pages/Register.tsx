/* eslint-disable no-useless-escape */
import InputErrorMassage from "../components/InputErrorMassage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
interface IFormInput {
  username:string;
  email:string;
  password:string;
}


const RegisterPage = () => {

    const { register, handleSubmit , formState:{errors} } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  
    console.log(errors)
  return (
    <>
      <div className=" flex flex-col space-y-4  mt-48 max-w-md mx-auto">
        <h2 className="font-semibold text-3xl  capitalize text-center">
          register to get access !
        </h2>
        <form className="space-y-4 flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>

          <Input placeholder="Username"{...register("username",{required:"true",minLength:5})} />
          {errors.username && errors.username.type === "required" && <InputErrorMassage msg="Username is required"/>}
          {errors.username && errors.username.type === "minLength" && <InputErrorMassage msg="username should be at least 5 characters"/>}
          </div>
          <div>

          <Input placeholder="Email"{...register("email",{required:"true",pattern:/^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/})} />
          {errors.email && errors.email.type === "required" && <InputErrorMassage msg="email is required"/>}
          {errors.email && errors.email.type === "pattern" && <InputErrorMassage msg="not valid email"/>}
          </div>
          <div>

          <Input placeholder="Password"{...register("password",{required:"true",minLength:6})}  />
          {errors.email && errors.email.type === "required" && <InputErrorMassage msg="password is required"/>}
          {errors.email && errors.email.type === "minLength" && <InputErrorMassage msg="password should be at least 6 characters"/>}
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize" type="submit">register</Button>
        </form>
      </div>
      </>
  );
};

export default RegisterPage;
