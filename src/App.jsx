import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screen/Login';
import Product from "./screen/Product";
import Header from "./screen/Header";
import Producted from "./screen/Producted";
import Signup from "./screen/Signup";
import StateProvider from "./state";
import User from "./screen/User";
import CartList from "./screen/Cart";
import WishList from "./screen/WishList";
import OrderPlaced from "./OrderPlaced";
import Logout from "./screen/Logout";
import ProfileView from "./screen/ProfileView";
import AdminPage from "./screen/AdminPage";

function App() {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/orderplaced" element={<Producted Component={OrderPlaced} />} />
          <Route path="/" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/:name" element={<User />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profileview" element={<ProfileView />} />
          <Route path="/adminpage" element={<AdminPage />} />
          {/* <Route path="/orderplaced" element={<OrderPlaced />} /> */}
        </Routes>
      </Router>
    </StateProvider>
  );
}

export default App;
























// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './screen/Login';
// import Product from "./screen/Product";
// import Header from "./screen/Header";
// import Producted from "./screen/Producted";
// import Signup from "./screen/Signup";
// import StateProvider from "./state";
// import User from "./screen/User";
// import CartList from "./screen/Cart";
// import WishList from "./screen/WishList";
// import OrderPlaced from "./OrderPlaced";

// function App() {
//   return (
//     <StateProvider>
//       <Router>
//         <Routes>
//           <Route path="/header" element={<Header />} />
//           <Route path="/" element={<Producted Component={Product} />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/user/:name" element={<User />} />
//           <Route path="/cart" element={<CartList />} />
//           <Route path="/wishlist" element={<WishList />} />
//           <Route path="/orderplaced" element={<OrderPlaced />} />
//         </Routes>
//       </Router>
//     </StateProvider>
//   );
// }

// export default App;

