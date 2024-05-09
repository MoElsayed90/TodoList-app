/* eslint-disable no-useless-escape */
import { REGISTER_FORM } from "../data";
import InputErrorMassage from "../components/InputErrorMassage";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterSchema } from "../components/validation";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}


const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>( {resolver: yupResolver(RegisterSchema)})
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

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
    </>
  );
};

export default RegisterPage;
