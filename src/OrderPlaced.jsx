import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "./state";

const OrderPlaced = () => {

    const { cart, CartAddToCartLocal, UserincreaseQuantity, CartLocal, UserdecreaseQuantity, handleOrderPlacement, wishlist, userCart } = useContext(StateContext)

    const navigate = useNavigate()

    function Orderplacedbtn() {
        if (userCart.length === 0) {
            alert("Order Quantity cannot be zero")
        } else {
            handleOrders()
        }
    }

    const localLoginPage = localStorage.getItem("login")

    const handleOrders = () => {
        if(localLoginPage === "true") {
            CartLocal()
            CartAddToCartLocal()
            handleOrderPlacement()
            alert("Order Placed")
            navigate("/")
        }else {
            navigate("/login")
        }
    }

    function orderCal() {
        if (userCart.length === 0) {
            alert("Order Quantity cannot be zero")
            navigate("/")
        } else {
            handleOrderPlacement()
            alert("Order Calcelled")
            navigate("/")
        }
    }

    return (
        <div>
            <div className="bg-blue-500 flex justify-between items-center pr-10 pl-10 text-white h-16 ">
                <Link to={"/"}>Product</Link>
                <Link to={"/cart"}>Cart
                    <sub>{cart.length}</sub>
                </Link>
                <Link to={"/wishlist"}>Favorite
                    <sub>{wishlist.length}</sub>
                </Link>
            </div>
            {
                userCart.map((item) => (
                    <div key={item.id}>
                        <div className="mt-10 ml-[600px] flex w-[600px]">
                            <div className="mt-5 flex justify-center">
                                <img className='mb-5 flex flex-row justify-center border-4 border-gray-400 rounded-xl h-40 w-40' src={item.url} width={40} alt={item.name} />
                            </div>
                            <div className="ml-5 mb-5 flex gap-2 justify-center items-center">
                                <span className='text-green-600'> {item.name} | {item.category} </span>
                                <button className='text-red-600' onClick={() => UserdecreaseQuantity(item.id)}>-</button>
                                <span> {item.quantity} </span>
                                <button className='text-green-700' onClick={() => UserincreaseQuantity(item.id)}>+</button>
                                {/* <span onChange={UserincreasePrice}>Rs. {item.price}</span> */}
                                <span className='text-red-600'>Rs. {item.price * item.quantity}</span>
                            </div>
                        </div>
                    </div>
            ))}
            <div className="right-10 py-10 pr-10 bottom-10 flex justify-end items-center">
                <p className='text-blue-400 '>Total: <span>{userCart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p>
                <button className='bg-green-600 ml-2 text-white rounded-md w-28 h-10' onClick={Orderplacedbtn}>Order Placed</button>
                <button className='bg-green-600 ml-2 text-white rounded-md w-32 h-10' onClick={orderCal}>Order Cancelled</button>
            </div>
        </div>
    );
};

export default OrderPlaced;

