import { textSlicer } from "../functions";
import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./Ui/Button";


interface IProps{
 product:IProduct
}
export default function ProductCard({product}:IProps) {
  const {title , imageURL,price,description , category } = product
  return (
   <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
    <Image  imageUrl={imageURL} alt={title} className='rounded-md mb-4 h-52 lg:object-cover'/>
    
    <h3 className="font-semibold text-lg ">{textSlicer(title , 25)}</h3>

      <p className="text-xs text-gray-500 break-words">{textSlicer(description , 80)}</p>

      <div className="flex items-center space-x-2 my-4">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-500 font-semibold">${price}</span>
        <div className=" flex items-center space-x-2
        ">
        <span className="text-xs font-semibold">{category.name}</span>
        <Image  imageUrl={category.imageURL} alt={category.name} className='w-10 h-10 rounded-full object-bottom'/>
        </div>

      </div>

      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 ">EDIT</Button>
        <Button className="bg-red-700 ">DELETE</Button>
      </div>

   </div>
  )
}