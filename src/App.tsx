import { useState } from "react"
import ProductCard from "./Components/ProductCard"
import Modal from "./Components/Ui/Modal"
import { productList } from "./data"
import Button from "./Components/Ui/Button"


function App() {
  /*------Control open and close Modal----------*/ 

    const [isOpen, setIsOpen] = useState(false)
  
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
/*------Render product List----------*/ 
  const renderProductList = productList.map((product)=><ProductCard key={product.id} product={product} />)

  return (
    <main className="container ">
<Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>Add</Button>

    <div className=" m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
     
      {renderProductList}
      
    </div>
    <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
      <div className="flex items-center space-x-3">
           <Button className="bg-indigo-700 hover:bg-indigo-800  ">Submit</Button>
            <Button className="bg-gray-300 hover:bg-gray-400 ">Cancel</Button>
      </div>
</Modal>

    </main>

  )
}

export default App