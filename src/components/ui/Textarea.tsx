import clsx from "clsx";
import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className:string;
}

const Textarea = ({ className,...rest }: IProps) => {
  return (
    <textarea
      className={clsx("border-[1px] border-gray-300 shadow-md focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent",className)}
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;
