import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
 
}
export default function Input({...rest}:IProps) {
  return (
 <input  {...rest} className="border border-gray-300 rounded-lg p-3 text-md shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 "/>
  )
}