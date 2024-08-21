import "../App.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { StateContext } from "../state";



const Product = () => {
  const { toggle, setToggle, products, UserPageOpen } = useContext(StateContext)

  return (
    <div>
      <Header />
      <div className="flex"  onClick={() => setToggle(false)}>
        {products.map(product => (
          <div className="productdiv" key={product.id}>
            <div className='product-item'>
              <Link to={`/user/${product.category}`}>
                <img onClick={() => UserPageOpen(product)} src={product.url} className='image' alt={product.name} />
              </Link>
              <p className="name">{product.name} | {product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product;

