/* eslint-disable react-refresh/only-export-components */
import clsx from "clsx";
import { FC, InputHTMLAttributes, Ref, forwardRef } from "react"

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
className:string;
}
const Input: FC<IProps> = forwardRef(({className, ...rest },ref:Ref<HTMLInputElement>) => {
    return <input   
    ref={ref}
    className={clsx(" border-[1px] border-gary-300 shadow-lg focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:duration-300 rounded-md px-3 py-3 text-md w-full",className)} {...rest} 
    />
})
export default Input;