import { useContext, useEffect, useState } from "react";
import { StateContext } from "../state";
import "../App.css";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function AdminPage() {
  const { cart, wishlist, toggleCart, toggle } = useContext(StateContext);

  const LocalSt = localStorage.getItem("userCart");
  const initialLocalSt = LocalSt ? JSON.parse(LocalSt).flat() : [];

  const [local, setLocal] = useState(initialLocalSt);
  const [filteredLocal, setFilteredLocal] = useState(initialLocalSt);
  const [filter, setFilter] = useState("All Orders");
  const [OrderFilter, setOrderFilter] = useState("All Orders No");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLocal = (OrderNo) => {
    const updatedLocal = local.map((item) =>
      item.OrderNo === OrderNo ? { ...item, delivered: true } : item
    );
    setLocal(updatedLocal);
    localStorage.setItem("userCart", JSON.stringify(updatedLocal));
  };

  // const Empty = () => {
  //   let filtered = local;
  //   if (filtered === "Pending Orders") {
  //     if (local.filter((item) => !item.delivered).length === 0) {
  //       filtered = "No Pending Orders";
  //     }
  //   }
  // };

  
  const yesDelivered = local.filter((item) => item.delivered); 
  const notDelivered = local.filter((item) => !item.delivered); 

  useEffect(() => {
    let filtered = local;
    if (filter === "Pending Orders") {
      filtered = notDelivered;
      // filtered = local.filter((item) => !item.delivered);
    } else if (filter === "Delivered Orders") {
      filtered = yesDelivered;
      // filtered = local.filter((item) => item.delivered);
    } else if (OrderFilter === "All Orders No") {
      filtered = local;
    } else {
      filtered = local.filter((item) => item.OrderNo === OrderFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    setFilteredLocal(filtered);
  }, [filter, local, searchTerm, OrderFilter]);

  const options = [
    { label: "All Orders", value: "All Orders" },
    { label: "Pending Orders", value: "Pending Orders" },
    { label: "Delivered Orders", value: "Delivered Orders" },
  ];

  const handleSearchBar = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOrderFilter = (event) => {
    setOrderFilter(event.target.value);
  };

  const pendingCount = local.filter((item) => !item.delivered).length;
  const deliveredCount = local.filter((item) => item.delivered).length;

  const data = [];
  if (pendingCount > 0) {
    data.push({ name: "Pending", value: pendingCount });
  }
  if (deliveredCount > 0) {
    data.push({ name: "Delivered", value: deliveredCount });
  }

  const COLORS = ["#00C49F", "#0088FE"];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredLocal.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredLocal.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div>
      <div className="bg-blue-500 flex items-center pr-10 pl-10 text-white h-16">
        <input
          className="text-black h-10 rounded-md w-[800px]"
          type="text"
          placeholder="Search"
          onChange={handleSearchBar}
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
          <button>
            <img
              src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
              alt=""
            />
          </button>
          {toggle === true ? <Profile /> : null}
        </div>
      </div>

      {/* All Order No */}
      {/* <div>
        <div className="flex justify-end">
          <select
            className="text-lg rounded-lg text-white bg-blue-500 w-40 h-10 mt-3"
            onChange={handleOrderFilter}
            value={OrderFilter}
          >
          <option className="text-blue-500 bg-white" value="All Orders No">
            All Order No
          </option>
            {local.map((option) => (
              <option
                className="text-blue-500 bg-white"
                key={option.value}
                value={option.value}
              >
                <p>{filter === "All Orders" ? option.label : filter === "Pending Orders" ? "Pending" : "Delivered"}</p>
                <p>{filter === "All Orders" ? option.OrderNo : filter === "Pending Orders" ? "Pending" : "Delivered"}</p>
              </option>
            ))}
          </select>
        </div>
      </div> */}

      {/* All Order */}
      <div>
        <div className="flex justify-end">
          <select
            className="text-lg rounded-lg text-white bg-blue-500 w-40 h-10 mt-3"
            onChange={handleFilterChange}
            value={filter}
          >
            {options.map((option) => (
              <option
                className="text-blue-500 bg-white"
                key={option.value}
                value={option.value}
              >
                <p>{option.label}</p>
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <table>
          <thead>
            <tr className="text-white bg-blue-500">
              <th>All Order No</th>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Category</th>
              <th>Order Delivered</th>
              <th>Order Button</th>
            </tr>
          </thead>
          <tbody>
           { records.length === 0 ? <p>No Data</p> : records.map((item) => (
              <tr className="hover:bg-gray-200" key={item.id}>
                <td>{item.OrderNo}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price * item.quantity}</td>
                <td>{item.quantity}</td>
                <td>{item.seller}</td>
                <td>{item.category}</td>
                <td>{item.delivered === true ? "Delivered" : "Pending..."}</td>
                <td>
                  <button
                    className="border-2 border-black rounded-md bg-green-400 text-white w-20 h-10 hover:bg-blue-500"
                    onClick={() => handleLocal(item.OrderNo)}
                    disabled={item.delivered}
                  >
                    {item.delivered ? "Delivered" : "Deliver"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="flex justify-end mt-5 mr-10">
          <ul className="pagination flex justify-start gap-10 ml-5">
            <li
              onClick={prePage}
              className="cursor-pointer page-item flex justify-center items-center rounded-lg w-16 h-8 border-2 border-black bg-green-500 text-white hover:bg-blue-500"
            >
              <a href="#" className="page-link">
                Prev
              </a>
            </li>
            {numbers.map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link flex justify-center items-center rounded-lg w-10 h-8 border-2 border-black hover:bg-gray-500 hover:text-white"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li
              onClick={nextPage}
              className="cursor-pointer page-item flex justify-center items-center rounded-lg w-16 h-8 border-2 border-black bg-green-500 text-white hover:bg-blue-500"
            >
              <a href="#" className="page-link">
                Next
              </a>
            </li>
          </ul>
        </nav>
        <br />
        <div>
          <PieChart 
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            width={400}
            height={220}
          >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, value }) => `${name} (${value})`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              formatter={(value, entry, index) => (
                <span style={{ color: COLORS[index] }}>{value}</span>
              )}
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default AdminPage;




















// import { useContext, useEffect, useState } from "react";
// import { StateContext } from "../state";
// import "../App.css";
// import Profile from "./Profile";
// import { Link } from "react-router-dom";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// function AdminPage() {
//   const { cart, wishlist, toggleCart, toggle } = useContext(StateContext);

//   const LocalSt = localStorage.getItem("userCart");
//   const initialLocalSt = LocalSt ? JSON.parse(LocalSt).flat() : [];

//   const [local, setLocal] = useState(initialLocalSt);
//   const [filteredLocal, setFilteredLocal] = useState(initialLocalSt);
//   const [filter, setFilter] = useState("All Orders");
//   const [OrderFilter, setOrderFilter] = useState("All Orders No");
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleLocal = (OrderNo) => {
//     const updatedLocal = local.map((item) =>
//       item.OrderNo === OrderNo ? { ...item, delivered: true } : item
//     );
//     setLocal(updatedLocal);
//     localStorage.setItem("userCart", JSON.stringify(updatedLocal));
//   };

//   // useEffect(() => {
//   //   let filtered = local;
//   //   if (filter === "Pending Orders") {
//   //     filtered = local.filter((item) => !item.delivered);
//   //   } else if (filter === "Delivered Orders") {
//   //     filtered = local.filter((item) => item.delivered);
//   //   } else if(OrderFilter === "All Orders No") {
//   //       filtered = local
//   //   } else {
//   //     filtered = local.filter((item) => item.OrderNo === OrderFilter)
//   //   }
//   //   if (searchTerm) {
//   //     filtered = filtered.filter((item) =>
//   //       item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
//   //     );
//   //   }

//   useEffect(() => {
//     let filtered = local;
//     if (filter === "Pending Orders") {
//       filtered = local.filter((item) => !item.delivered);
//     } else if (filter === "Delivered Orders") {
//       filtered = local.filter((item) => item.delivered);
//     } else if (OrderFilter === "All Orders No") {
//       filtered = local;
//     } else {
//       filtered = local.filter((item) => item.OrderNo === OrderFilter);
//     }
//     if (searchTerm) {
//       filtered = filtered.filter((item) =>
//         item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredLocal(filtered);
//   }, [filter, local, searchTerm, OrderFilter]);

//   const options = [
//     { label: "All Orders", value: "All Orders" },
//     { label: "Pending Orders", value: "Pending Orders" },
//     { label: "Delivered Orders", value: "Delivered Orders" },
//   ];

//   const AdminVari = () => {
//     // let filtered = local
//     const notDelivered = local.map((item) => !item.OrderNo);
//     const yesdelivered = local.map((item) => !item.OrderNo);
//     const deliveredVari = local.map((item) => item.OrderNo);
//     if (filter === "Pending Orders") {
//       return notDelivered
//       // return "Pending Orders";
//     } else if (filter === "Delivered Orders") {
//       return yesdelivered
//       // return "Delivered Orders";
//     } else if (OrderFilter === "All Orders No") {
//       return deliveredVari
//       // return "All Orders No";
//     } else {
//       return OrderFilter
//       // return `Order No: ${OrderFilter}`;
//     }
//   }

//   // const orderNumbers = local.map((item) => item.OrderNo);
//   const OrderOptions = [
//     { label: "All Orders No", value: "All Orders No" },
//     { label: AdminVari(), value: AdminVari() },
//     // ...orderNumbers.map((orderNo) => ({
//     //   label: `Order No: ${orderNo}`,
//     //   value: orderNo,
//     // })),
//   ];

//   // const notDelivered = local.filter((item) => !item.OrderNo);
//   // const yesdelivered = local.filter((item) => item.OrderNo);

//   // const orderNumbers = local.map((item) => item.OrderNo);
//   // const OrderOptions = [
//   //   { label: "All Orders No", value: "All Orders No" },
//   //   ...orderNumbers.map((orderNo) => ({
//   //     label: `Order No: ${orderNo}`,
//   //     value: orderNo,
//   //   })),
//   // ];

//   const handleSearchBar = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };
//   const handleOrderFilter = (event) => {
//     setOrderFilter(event.target.value);
//   };

//   const pendingCount = local.filter((item) => !item.delivered).length;
//   const deliveredCount = local.filter((item) => item.delivered).length;

//   const data = [];
//   if (pendingCount > 0) {
//     data.push({ name: "Pending", value: pendingCount });
//   }
//   if (deliveredCount > 0) {
//     data.push({ name: "Delivered", value: deliveredCount });
//   }

//   const COLORS = ["#00C49F", "#0088FE"];

//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage;
//   const records = filteredLocal.slice(firstIndex, lastIndex);
//   const npage = Math.ceil(filteredLocal.length / recordsPerPage);
//   const numbers = [...Array(npage + 1).keys()].slice(1);

//   return (
//     <div>
//       <div className="bg-blue-500 flex items-center pr-10 pl-10 text-white h-16">
//         <input
//           className="text-black h-10 rounded-md w-[800px]"
//           type="text"
//           placeholder="Search"
//           onChange={handleSearchBar}
//         />
//         <Link to={"/adminpage"}>Admin</Link>
//         <Link to={"/"}>Product</Link>
//         <Link to={"/cart"}>
//           Cart
//           <sub>{cart.length}</sub>
//         </Link>
//         <Link to={"/wishlist"}>
//           Favorite
//           <sub>{wishlist.length}</sub>
//         </Link>
//         <div
//           onClick={toggleCart}
//           className="border-2 border-black rounded-full w-14 h-14"
//         >
//           <button>
//             <img
//               src="https://www.olx.com.pk/assets/iconProfilePicture.7975761176487dc62e25536d9a36a61d.png"
//               alt=""
//             />
//           </button>
//           {toggle === true ? <Profile /> : null}
//         </div>
//       </div>

//       <div>
//         <div className="flex justify-end">
//           <select
//             className="text-lg rounded-lg text-white bg-blue-500 w-40 h-10 mt-3"
//             onChange={handleOrderFilter}
//             value={OrderFilter}
//           >
//             {local.map((option) => (
//               <option
//                 className="text-blue-500 bg-white"
//                 key={option.value}
//                 value={option.value}
//               >
//                 <p>{option.OrderNo}</p>
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         <div className="flex justify-end">
//           <select
//             className="text-lg rounded-lg text-white bg-blue-500 w-40 h-10 mt-3"
//             onChange={handleFilterChange}
//             value={filter}
//           >
//             {options.map((option) => (
//               <option
//                 className="text-blue-500 bg-white"
//                 key={option.value}
//                 value={option.value}
//               >
//                 <p>{option.label}</p>
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="mt-3">
//         <table>
//           <thead>
//             <tr className="text-white bg-blue-500">
//               <th>All Order No</th>
//               <th>Id</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Seller</th>
//               <th>Category</th>
//               <th>Order Delivered</th>
//               <th>Order Button</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((item) => (
//               <tr className="hover:bg-gray-200" key={item.id}>
//                 <td>{item.OrderNo}</td>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.price * item.quantity}</td>
//                 <td>{item.quantity}</td>
//                 <td>{item.seller}</td>
//                 <td>{item.category}</td>
//                 <td>{item.delivered === true ? "Delivered" : "Pending..."}</td>
//                 <td>
//                   <button
//                     className="border-2 border-black rounded-md bg-green-400 text-white w-20 h-10 hover:bg-blue-500"
//                     onClick={() => handleLocal(item.OrderNo)}
//                     disabled={item.delivered}
//                   >
//                     {item.delivered ? "Delivered" : "Deliver"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <nav className="flex justify-end mt-5 mr-10">
//           <ul className="pagination flex justify-start gap-10 ml-5">
//             <li
//               onClick={prePage}
//               className="cursor-pointer page-item flex justify-center items-center rounded-lg w-16 h-8 border-2 border-black bg-green-500 text-white hover:bg-blue-500"
//             >
//               <a href="#" className="page-link">
//                 Prev
//               </a>
//             </li>
//             {numbers.map((n, i) => (
//               <li
//                 className={`page-item ${currentPage === n ? "active" : ""}`}
//                 key={i}
//               >
//                 <a
//                   href="#"
//                   className="page-link flex justify-center items-center rounded-lg w-10 h-8 border-2 border-black hover:bg-gray-500 hover:text-white"
//                   onClick={() => changeCPage(n)}
//                 >
//                   {n}
//                 </a>
//               </li>
//             ))}
//             <li
//               onClick={nextPage}
//               className="cursor-pointer page-item flex justify-center items-center rounded-lg w-16 h-8 border-2 border-black bg-green-500 text-white hover:bg-blue-500"
//             >
//               <a href="#" className="page-link">
//                 Next
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <br />
//         <div>
//           <PieChart
//             margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//             width={400}
//             height={200}
//           >
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               dataKey="value"
//               label={({ name, value }) => `${name} (${value})`}
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Legend
//               formatter={(value, entry, index) => (
//                 <span style={{ color: COLORS[index] }}>{value}</span>
//               )}
//             />
//             <Tooltip />
//           </PieChart>
//         </div>
//       </div>
//     </div>
//   );

//   function prePage() {
//     if (currentPage !== 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   }

//   function changeCPage(id) {
//     setCurrentPage(id);
//   }

//   function nextPage() {
//     if (currentPage !== npage) {
//       setCurrentPage(currentPage + 1);
//     }
//   }
// }

// export default AdminPage;
