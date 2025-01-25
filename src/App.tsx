import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./Components/ProductCard"
import Modal from "./Components/Ui/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./Components/Ui/Button"
import Input from "./Components/Ui/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./Validation"
import ErrorMessage from "./Components/Ui/ErrorMessage"
import CircleColor from "./Components/Ui/CircleColor"
import { v4 as uuid } from "uuid";
import Select from "./Components/Ui/Select"
import toast, { Toaster } from 'react-hot-toast';



function App() {
  /*------Control open and close Modal----------*/ 
    const defaultProductObj = {
      title:'',
      description:'',
      imageURL:'',
      price:'' ,
      colors:[],
      category:{
       name:'',
       imageURL:''
      }
   }
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [products, setProducts] = useState<IProduct[]>(productList)
    const [product, setProduct] = useState<IProduct>(defaultProductObj)
    const [errors, setErrors] = useState({
      title:'',
      description:'',
      imageURL:'',
      price:'' ,
      colors:''
    })
    const [tempColors,setTempColors] = useState<string[]>([])
    const [selected, setSelected] = useState(categories[0])
    const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj)
    const [index, setIndex] = useState(0)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    

 
// --------------Handlers-----------------
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
    function closeEditModal() {
      setIsOpenEditModal(false)
    }
    function closeConfirmModal() {
      setIsOpenConfirmModal(false)
    }
    function openConfirmModal() { setIsOpenConfirmModal(true); }

  
    function openEditModal() {
      setIsOpenEditModal(true)
    }
    function changeHandler(e:ChangeEvent<HTMLInputElement>){
    const  {name, value}= e.target
        setProduct({
          ...product,
          [name]:value
        })
        setErrors({...errors,
          [name]:'',
        })


    }
    function onChangeEditHandler(e:ChangeEvent<HTMLInputElement>){
    const  {name, value}= e.target
    setProductToEdit({
          ...productToEdit,
          [name]:value
        })
        setErrors({...errors,
          [name]:'',
        })


    }
  
    function submitEditHandler(e:FormEvent<HTMLFormElement>){
      e.preventDefault()
    const errors =  productValidation(productToEdit)
    tempColors.length >0 ?errors.colors='':null
    const isValid = Object.values(errors).every((value)=>value=='')
    if(!isValid) {
      setErrors(errors)
      return
    }
    console.log(' Data will send to API')
    const updatedProducts =[...products]
    updatedProducts[index]=productToEdit
    setProducts(updatedProducts)
    setProductToEdit(defaultProductObj)
    setTempColors([])
    closeEditModal()
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
    }
  
    function submitHandler(e:FormEvent<HTMLFormElement>){
      e.preventDefault()
    const errors =  productValidation(product)
    tempColors.length >0 ?errors.colors='':null
    const isValid = Object.values(errors).every((value)=>value=='')
    if(!isValid) {
      setErrors(errors)
      return
    }
    console.log(' Data will send to API')
    setProducts(prev=>[{...product,id:uuid(),colors:tempColors , category:selected},...prev]) 
    setProduct(defaultProductObj)
    setTempColors([])
    closeModal()
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
    }

    function cancelHandler(){
        setProduct(defaultProductObj)
        closeModal()
    }
    function cancelEditHandler(){
        setProductToEdit(defaultProductObj)
        closeEditModal()
    }

    function removeProductHandler(){
      const filtered = products.filter((product)=> productToEdit.id !== product.id )

      setProducts(filtered)
      closeConfirmModal()
      toast("Product has been deleted successfully!", {
        icon: "👏",
        style: {
          backgroundColor: "#c2344d",
          color: "white",
        },
      });

    }

/*------Render ----------*/ 
  const renderProductList = products.map((product,index)=><ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openEditModal={openEditModal} index = {index} setIndex={setIndex} openConfirmModal={openConfirmModal}/>)



  const renderColors = colors.map((color)=><CircleColor key={color} color={color} onClick={()=>{
    let updatedColors = []
    if(tempColors.includes(color)){
      setTempColors((prev)=>prev.filter((item)=>item!==color))
      
    }
    if(productToEdit.colors.includes(color) && isOpenEditModal){
      updatedColors = [...productToEdit.colors]
      updatedColors = updatedColors.filter((item)=>item !== color)
      setProductToEdit({...productToEdit,colors:updatedColors})
      
    }
    if(!productToEdit.colors.includes(color) && isOpenEditModal){
      updatedColors = [...productToEdit.colors, color]
      setProductToEdit({...productToEdit,colors:updatedColors})
    }
    
    
    else{
      setTempColors((prev)=>[...prev,color])      
  
    }
  }} />)

  const renderFormInputs = formInputsList.map((input)=><div className="flex flex-col" key={input.id}>
    <label className="mb-[2px] text-sm font-medium text-gray-500" htmlFor={input.id} >{input.label}</label>
    <Input id={input.id} name={input.name} type={input.type} value={product[input.name]} onChange={changeHandler}/>
    <ErrorMessage msg={errors[input.name]}/>
  </div>
)
  const renderEditFormInputs = formInputsList.map((input)=><div className="flex flex-col" key={input.id}>
    <label className="mb-[2px] text-sm font-medium text-gray-500" htmlFor={input.id} >{input.label}</label>
    <Input id={input.id} name={input.name} type={input.type} value={productToEdit[input.name]} onChange={onChangeEditHandler}/>
    <ErrorMessage msg={errors[input.name]}/>
  </div>
)

  return (
    <main className="container ">
 <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>

    <div className=" m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
     
      {renderProductList}

      
    </div>


{/*Add A New Product  */}
    <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">


      <form className="space-y-3" onSubmit={submitHandler}>

      {renderFormInputs}

      <Select selected = {selected} setSelected={setSelected}/>

<div className=" flex flex-col my-4">
      <div className="flex items-center space-x-2 my-2 ">
      {renderColors}
      </div>

     {tempColors.length===0 ? <ErrorMessage msg={errors.colors}/>:null}
</div>
      

      <div className="flex flex-wrap items-center space-x-1 my-4">
      {tempColors.map((color)=>
        <span key={color} className="p-1 mr-1 mb-1 text-xs text-white rounded-md" style={{backgroundColor:color}}>{color}</span>
      )}
      </div>

      <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={cancelHandler}>
              Cancel
            </Button>
          </div>

      </form>


</Modal>


{/* Edit Modal */}
    <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT THIS PRODUCT">


      <form className="space-y-3" onSubmit={submitEditHandler}>

      {renderEditFormInputs}

      <Select selected = {productToEdit.category} setSelected={(value)=> setProductToEdit({...productToEdit,category:value})}/>

<div className=" flex flex-col my-4">
      <div className="flex items-center space-x-2 my-2 ">
      {renderColors}
      </div>

     {tempColors.length===0 ? <ErrorMessage msg={errors.colors}/>:null}
</div>
      

      <div className="flex flex-wrap items-center space-x-1 my-4">
      {productToEdit.colors.map((color)=>
        <span key={color} className="p-1 mr-1 mb-1 text-xs text-white rounded-md" style={{backgroundColor:color}}>{color}</span>
      )}
      </div>

      <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={cancelEditHandler}>
              Cancel
            </Button>
          </div>

      </form>


</Modal>



 {/* DELETE PRODUCT CONFIRM MODAL */}
 <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
  </Modal>


<Toaster/>

    </main>

  )
}

export default App