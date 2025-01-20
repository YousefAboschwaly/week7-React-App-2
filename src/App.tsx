import ProductCard from "./Components/ProductCard"
import { productList } from "./data"


function App() {

  const renderProductList = productList.map((product)=><ProductCard key={product.id} product={product} />)

  return (
    <main className="container ">

    <div className=" m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
     
      {renderProductList}
      
    </div>

    </main>
  )
}

export default App