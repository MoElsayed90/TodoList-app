/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, FC, ReactNode, memo } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className: string;
    width?: "w-full" | "w-fit";
}
const Button: FC<IProps> = ({ children, className,width="w-full", ...rest }) => {
    return (
        <button className={`${className} ${width} rounded-lg text-white px-3 py-3 duration-200 font-medium`} {...rest}>
            {children}
        </button>
    )
}

export default memo(Button);