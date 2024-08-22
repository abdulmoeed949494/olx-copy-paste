import { createContext, useEffect, useState } from 'react'
import { ProductData } from './common/productsData';

export const StateContext = createContext(null)

  export default function StateProvider({ children }) {
    
  const [products, setProducts] = useState(ProductData);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  
  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  const decreaseQuantity = (id) => {
    const p = cart.find(i => i.id === id);
    if (p.quantity === 1) {

      const updatedCart = cart.filter((item) => item.id != id);
      setCart(updatedCart);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, quantity:   item.quantity - 1 } : item
      );
      setCart(updatedCart);
    }
  }

  const [searchFilter, setSearchFilter] = useState("")

  useEffect(() => {
    if (searchFilter != "") {
      setProducts(products.filter((product) => product.category.toLowerCase().includes(searchFilter.toLowerCase())));
    } else {
      setProducts(ProductData);
    }
  }, [searchFilter]);

  useEffect(() => {
    window.localStorage.setItem("local", JSON.stringify(cart))
  }, [cart])

  const [SignupInput, setSignupInput] = useState({
    name: "",
    phone: "",
    adress: "",
    email: "",
    password: "",
})

  const [input, setInput] = useState({
    email: "",
    password: "",
})

const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)

const Successtimer = () => {
    setTimeout(() => {
        setSuccess(true)
    }, 1000)
}

const Errortimer = () => {
    setTimeout(() => {
        setError(false)
    }, 2000)
}

const login = () => {
  localStorage.setItem('login', true);
  setIsLogin(true);
};

const [userCart, setUserCart] = useState([])

const UserincreaseQuantity = (id) => {
  const updatedCart = userCart.map(item =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  )
  setUserCart(updatedCart);
}




{/* <p className='text-blue-400 '>Total: <span>{userCart.reduce((total, item) => total + (item.price * item.quantity), 0)}</span></p> */}

const UserdecreaseQuantity = (id) => {
  const p = userCart.find(i => i.id === id)
  if (p.quantity === 1) {

    const updatedCart = userCart.filter((item) => item.id != id)
    setUserCart(updatedCart);
  } else {
    const updatedCart = userCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setUserCart(updatedCart);
  }
}

  const [wishlist, setWishList] = useState([])

  const increaseWishListQuantity = (id) => {
    const updatedCart = wishlist.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setWishList(updatedCart);
  }

  const decreaseWishListQuantity = (id) => {
    const p = wishlist.find(i => i.id === id);
    if (p.quantity === 1) {
      const updatedCart = wishlist.filter((item) => item.id != id);
      setWishList(updatedCart);
    } else {
      const updatedCart = wishlist.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setWishList(updatedCart);
    }
  }

  const favoriteFunc = (product) => {
    const existingItem = wishlist.find(item => item.id === product.id)
    if (existingItem) {
      setWishList(wishlist.filter(item => item.id !== product.id))
    } else {
      setWishList([...wishlist, { ...product, quantity: 1 }])
    }
  }

  const UserPageOpen = (product) => {
    setUserCart([{ ...product, quantity: 1 }])
  }

  function handleOrderPlacement() {
    setCart([])
    setShowCart(false)
  }

  const CartLocal = () => {
    let r = (Math.random()).toString(36).substring(7)
    let use =  localStorage.getItem("userCart", JSON.stringify(userCart)) || "[]"
    use = JSON.parse(use)
    if(userCart.length > 1){
      userCart.forEach(element => {
        element.OrderNo = r
      });
      use.push(userCart)
    }
    userCart[0].OrderNo = r  
    use.push(userCart)
  }

  const LocalSt = localStorage.getItem("userCart", userCart);
    

  const [isLogin, setIsLogin] = useState(false);

  const [toggle, setToggle] = useState(false);

  const toggleCart = () => {
    if (toggle === false) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const CartAddToCartLocal = () => {
    let use =  localStorage.getItem("userCart", JSON.stringify(userCart)) || "[]"
     use = JSON.parse(use)
     use.push(userCart)
     localStorage.setItem("userCart", JSON.stringify(use))
 }

    const userInput = {
      email: SignupInput.email,
      password: SignupInput.password,
  };

  
  
  return <StateContext.Provider value={{
      products, setProducts, input, setInput, error, setError, success, setSuccess, Successtimer, Errortimer, SignupInput, setSignupInput, isLogin, setIsLogin, login, userCart, setUserCart, UserincreaseQuantity, UserdecreaseQuantity, searchFilter, setSearchFilter, cart, setCart, addToCart, increaseQuantity, decreaseQuantity, showCart, setShowCart, UserPageOpen, wishlist, setWishList, favoriteFunc, increaseWishListQuantity, decreaseWishListQuantity, handleOrderPlacement, LocalSt, CartLocal, toggle, setToggle, CartAddToCartLocal, userInput, toggleCart
  }}>
    {children}
  </StateContext.Provider>
}
