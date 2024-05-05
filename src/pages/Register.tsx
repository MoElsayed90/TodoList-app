import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


const RegisterPage = () => {

  return (
    <>
      <div className=" flex flex-col space-y-4 max-w-md mx-auto content-center mt-48  items-center">
        <h2 className="font-semibold text-3xl  capitalize">
          register to get access !
        </h2>
        <form className="space-y-4 flex flex-col w-full">
          <Input placeholder="Username"/>
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Button className="bg-indigo-500 hover:bg-indigo-700 capitalize">register</Button>
        </form>
      </div>
      {/* <div className="max-w-md mx-auto flex w-full">  
     <h2 className="text-center mb-4 text-3xl font-semibold">
    //     Register to get access!
    //   </h2>
    //   <form className="space-y-4 ">
    //     <Input placeholder="Username"/>
    //     <Input placeholder="Email address"/>
    //     <Input placeholder="Password"/>
    //     <Button className="mt-5 bg-neutral-700 hover:bg-neutral-900">Register</Button>
    //   </form>
    // </div> */}
    </>
  );
};

export default RegisterPage;
