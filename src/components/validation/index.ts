/* eslint-disable no-useless-escape */
import * as yup from "yup"
export const  RegisterSchema = yup
  .object({
    username : yup.string().required("Username is Required").min(5,"Username should be at least 5 characters"),
    email : yup.string().required("Email is Required").matches(/^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/,"Not vaild email address"),
    password:yup.string().required("Password is Required").min(6,"Password should be at least 6 characters")
  })
  .required()