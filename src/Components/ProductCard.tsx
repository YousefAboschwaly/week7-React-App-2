import { numberWithCommas, textSlicer } from "../utils/functions";
import { IProduct } from "../interfaces";
import Image from "./Image";
import Button from "./Ui/Button";
import CircleColor from "./Ui/CircleColor";


interface IProps{
 product:IProduct
 setProductToEdit:(product:IProduct)=>void;
 openEditModal:()=>void;
 index:number;
 setIndex:(index:number)=>void
 openConfirmModal:()=>void
}
export default function ProductCard({product,setProductToEdit,openEditModal,index,setIndex,openConfirmModal}:IProps) {
  const {title , imageURL,price,description ,colors ,category } = product
    const renderColors = colors.map((color)=><CircleColor key={color} color={color} />)
  function onEdit(){
    setProductToEdit(product)
    setIndex(index)
    openEditModal()
  }
  function onRemove(){
    setProductToEdit(product)
    openConfirmModal()
  }
  return (
   <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
    <Image  imageUrl={imageURL} alt={title} className='rounded-md mb-4 h-52 lg:object-cover'/>
    
    <h3 className="font-semibold text-lg ">{textSlicer(title , 25)}</h3>

      <p className="text-xs text-gray-500 break-words">{textSlicer(description , 80)}</p>

      <div className="flex items-center space-x-2 my-4">
       {colors.length>0? renderColors : <p className="min-h-[20px]">Not available colors!</p>}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-500 font-semibold">${numberWithCommas(price)}</span>
        <div className=" flex items-center space-x-2
        ">
        <span className="text-xs font-semibold">{category.name}</span>
        <Image  imageUrl={category.imageURL} alt={category.name} className='w-10 h-10 rounded-full object-bottom'/>
        </div>

      </div>

      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>

   </div>
  )
}