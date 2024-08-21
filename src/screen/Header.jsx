import { useContext } from "react";
import Profile from "./Profile";
import { StateContext } from "../state";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleCart, toggle, setToggle, setSearchFilter, cart, wishlist } = useContext(StateContext);

  // const toggleCart = () => {
  //   if (toggle === false) {
  //     setToggle(true);
  //   } else {
  //     setToggle(false);
  //   }
  // };


  return (
    <div className="bg-blue-500 flex items-center pr-10 pl-10 text-white h-16">
      <input
        onClick={() => setToggle(false)}
        className="text-black h-10 rounded-md w-[800px]"
        type="text"
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Search"
      />
      <Link to={"/adminpage"}>Admin</Link>
      <Link to={"/"}>Product</Link>
      <Link to={"/cart"}>
        Cart
        <sub>{cart.length}</sub>
      </Link>
      <Link to={"/wishlist"}>
        Favorite
        <sub>{wishlist.length}</sub>
      </Link>
      <div
        onClick={toggleCart}
        className="border-2 border-black rounded-full w-14 h-14"
      >
        <button className="">
          <img
            src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
            alt=""
          />
        </button>

        {toggle === true ? <Profile /> : null}
      </div>
    </div>
  );
};

export default Header;
