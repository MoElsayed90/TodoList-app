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