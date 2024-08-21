import { useContext } from "react";
import "../App.css"
import { StateContext } from "../state";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaRegSmile } from "react-icons/fa";

const CartList = () => {

  const navigate = useNavigate()

  function Orderplacedbtn() {
    if (cart.length === 0) {
      alert("Order Quantity cannot be zero")
      navigate("/")
    } else {
      // orderLogin()   
      // setCart([...cart, ...userCart])
      setUserCart(cart)
      setCart([])
      navigate("/orderplaced")
    }
  }

  function DeleteBtn() {
    setCart([])
    setShowCart(false)
    navigate("/")
  }

  const { cart, setUserCart, increaseQuantity, decreaseQuantity, setShowCart, setCart, userCart } = useContext(StateContext)

  return (
    <div>
        <Header />
        {cart.length === 0 ? <div className="flex justify-center items-center w-screen">
          <div className="flex justify-center text-5xl items-center text-center w-96 gap-5 mt-10">Cart is Empty <span className="text-blue-500"><FaRegSmile /></span>
        </div>
        </div>
         : <div> 
      {
        cart.map((item) => (
          <div key={item.id}>
            <div className="mt-10 ml-[600px] flex w-[600px]">
              <div className="mt-5 flex justify-center">
                <img className='mb-5 flex flex-row justify-center border-4 border-gray-400 rounded-xl h-40 w-40' src={item.url} width={40} alt={item.name} />
              </div>
              <div className="ml-5 mb-5 flex gap-2 justify-center items-center">
                <span className='text-green-600'> {item.name} | {item.category} </span>
                <button className='text-red-600' onClick={() => decreaseQuantity(item.id)}>-</button>
                <span> {item.quantity} </span>
                <button className='text-green-700' onClick={() => increaseQuantity(item.id)}>+</button>
                <span className='text-red-600'>Rs. {item.price * item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
    }
    {cart.length === 0 ? null :
          <div className="right-10 py-10 pr-10 bottom-10 flex justify-end items-center">
            <p className='text-blue-400 '>Total: <span>{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p>
            <button className='hoverclass bg-green-600 ml-2 text-white rounded-md w-28 h-12' onClick={Orderplacedbtn}>Buy Now</button>
            <button className='hoverclass bg-green-600 ml-2 text-white rounded-md w-32 h-12' onClick={DeleteBtn}>Delete Products</button>
          </div>
    }
    </div>
  );
};

export default CartList;



























// import { useContext } from "react";
// import "../App.css"
// import { StateContext } from "../state";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";

// const CartList = () => {

//   const navigate = useNavigate()

//   function Orderplacedbtn() {
//     if (cart.length === 0) {
//       alert("Order Quantity cannot be zero")
//       navigate("/")
//     } else {
//       // orderLogin()   
//       setCart([...cart, ...userCart])
//       navigate("/orderplaced")
//     }
//   }

//   function DeleteBtn() {
//     setCart([])
//     setShowCart(false)
//     navigate("/")
//   }

//   const { cart, increaseQuantity, decreaseQuantity, wishlist, setShowCart, setCart, userCart, setUserCart } = useContext(StateContext)

//   return (
//     <div>
//         <Header />
//       {
//         cart.map((item) => (
//           <div key={item.id}>
//             <div className="mt-10 ml-[600px] flex w-[600px]">
//               <div className="mt-5 flex justify-center">
//                 <img className='mb-5 flex flex-row justify-center border-4 border-gray-400 rounded-xl h-40 w-40' src={item.url} width={40} alt={item.name} />
//               </div>
//               <div className="ml-5 mb-5 flex gap-2 justify-center items-center">
//                 <span className='text-green-600'> {item.name} | {item.category} </span>
//                 <button className='text-red-600' onClick={() => decreaseQuantity(item.id)}>-</button>
//                 <span> {item.quantity} </span>
//                 <button className='text-green-700' onClick={() => increaseQuantity(item.id)}>+</button>
//                 <span className='text-red-600'>Rs. {item.price * item.quantity}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       <div className="right-10 py-10 pr-10 bottom-10 flex justify-end items-center">
//         <p className='text-blue-400 '>Total: <span>{cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p>
//         <button className='hoverclass bg-green-600 ml-2 text-white rounded-md w-28 h-12' onClick={Orderplacedbtn}>Buy Now</button>
//         <button className='hoverclass bg-green-600 ml-2 text-white rounded-md w-32 h-12' onClick={DeleteBtn}>Delete Products</button>
//       </div>
//     </div>
//   );
// };

// export default CartList;

