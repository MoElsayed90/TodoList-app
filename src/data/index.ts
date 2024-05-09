/* eslint-disable no-useless-escape */
import { IRegister } from "../interface";
export const REGISTER_FORM:IRegister[] =[
  {
    name : "username",
    placeholder:"Username",
    type:"text",
    validation:{
      required:true,
      minLength:5,
    }    
  },
  {
    name : "email",
    placeholder:"Email Address",
    type:"email",
    validation:{
      required: true,
      pattern:/^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/,
    }
  },
  {
    name : "password",
    placeholder:"Password",
    type:"password",
    validation:{
      required: true,
      minLength:6,
    }
  }
]