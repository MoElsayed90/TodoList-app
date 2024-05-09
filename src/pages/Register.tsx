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
          <Input placeholder="Username"{...register("username",{required:"Username is Required"})} />
          <Input placeholder="Email"{...register("email",{required:"Email is Required"})} />
          <Input placeholder="Password"{...register("password",{required:"password is Required"})}  />
          <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize" type="submit">register</Button>
        </form>
      </div>
      </>
  );
};

export default RegisterPage;
