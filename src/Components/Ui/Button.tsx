import { ButtonHTMLAttributes,ReactNode } from "react";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
 className:string;
 children:ReactNode;
 width?:'w-full' | 'w-fit'
}
export default function Button({children ,className, width='w-full' ,  ...rest  }:IProps) {
  return (
    <>

  <button className={`${className} ${width} p-2 rounded-lg text-white` } {...rest}>{children}</button>
 
    </>
  )
}