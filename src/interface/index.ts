export interface IRegister {
  name:"email"|"username"|"password";
  placeholder:string;
  type:string;
  validation :{
    required? : boolean;
    minLength?: number;
    pattern?: RegExp;

  }
}
export interface ILogin {
  name:"identifier"|"password";
  placeholder:string;
  type:string;
  validation :{
    required? : boolean;
    minLength?: number;
    pattern?: RegExp;

  }
}

export interface IErrorResponse {
  error:{
    message?:string;
  }
}