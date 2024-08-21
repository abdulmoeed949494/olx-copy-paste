import { useContext } from 'react'
import { StateContext } from '../state'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const User = () => {

    const { products, userCart, setUserCart, UserincreaseQuantity, UserdecreaseQuantity, cart, setCart, wishlist, favoriteFunc } = useContext(StateContext) 

        const navigate = useNavigate()

    const UserCartToAddToCart = () => {
        setCart([...cart, ...userCart])
        navigate("/cart")
    }

    function BuyFunc() {
        setUserCart([...userCart])
        navigate("/orderplaced")
    }

  return (
    <div>
        <Header />
    {
        userCart.map((item) => (
            <div key={item.id} className="grid grid-cols-2 w-[1500px] h-[600px]">
                <div className="grid grid-rows-2 mt-5 h-[500px] justify-center">
                    <img className='mb-5 ml-10 flex-row justify-center border-4 border-gray-400 rounded-xl w-[550px] h-[550px]' src={item.url} width={40} alt={item.name} />
                </div>
                <div>
                    <div className="text-2xl w-[600px] mt-20 h-20">
                        <span className='text-green-600'> {item.name} | {item.category} </span>
                    </div>
                    <div className="flex justify-start text-2xl w-96 mt-8">
                        Quantity
                        <button className='text-red-600 ml-3 mr-3' onClick={() => UserdecreaseQuantity(item.id)}>-</button>
                        <span> {item.quantity} </span>
                        <button className='text-green-700 ml-3 mr-3' onClick={() => UserincreaseQuantity(item.id)}>+</button>
                        <span className='text-red-600'>Rs. {item.price * item.quantity}</span>
                    </div>

                    <div className="flex justify-start items-center mt-16 w-60 h-20">
                        {/* <button className="hoverclass bg-green-600 text-white flex justify-center items-center rounded-lg w-36 h-16 text-2xl" onClick={() => favoriteFunc(item)}>Favorite</button> */}
                        <p onClick={() => favoriteFunc(item)} className="text-4xl" style={{ cursor: 'pointer' }}>
                            {wishlist.find(wishItem => wishItem.id === item.id) ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder style={{ color: 'black' }} />}
                        </p>
                    </div>

                    <div className="flex justify-start gap-10 mt-10 w-96 text-2xl">
                        <button className="hoverclass bg-green-600 text-white flex justify-center items-center rounded-lg w-36 h-16" onClick={BuyFunc}>Buy Now</button>
                        <button className="hoverclass bg-green-600 text-white flex justify-center items-center rounded-lg w-40 h-16" onClick={() => UserCartToAddToCart(products)}>Add To Cart</button>
                    </div>
                </div>
            </div>
    ))}
    </div>
  )
}

export default User
