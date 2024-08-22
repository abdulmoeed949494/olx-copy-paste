import { useContext, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
// import Success from "./Success";
import Error from "./Error";
import { StateContext } from "../state";

const Login = () => {
  const { setIsLogin, userInput, userCart, input, setInput, error, setError, success, setSuccess, Successtimer, Errortimer, login, handleOrderPlacement } = useContext(StateContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login) {
      setIsLogin(true);
      navigate("/");
    }
  });

  // const login = () => {
  //   localStorage.setItem('login', true);
  //   setIsLogin(true);
  // };

  const createFunc = () => {
    navigate("/signup");
  };

  const handleInputlength = () => {
    // if(input.email.length < 2 || input.password.length < 2) {
    if(userInput < 2) {
      alert("Please Login")
  }else {
    CartLocalStorage()
    navigate("/")
    // alert("Order Placed")
    handleOrderPlacement()
  }
}

  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (input.email === loggeduser.email && input.password === loggeduser.password) {
      localStorage.setItem("loggedin", true);
      login();
      localStorage.setItem("login", true);
      localStorage.setItem("input", JSON.stringify(input));
      handleInputlength()
      setSuccess(true);
      // Successtimer();
      handleOrderPlacement()
      // alert("Order Placed")
      navigate("/");
    }else {
      setError(true);
      Errortimer();
    }
  };

  const CartLocalStorage = () => {
    let use =  localStorage.getItem("userCart", JSON.stringify(userCart)) || "[]"
     use = JSON.parse(use)
     use.push(userCart)
     localStorage.setItem("userCart", JSON.stringify(use))
 }

  return (
    <div>
      <div className="h-20">
        <div className="flex justify-center items-center">{error && <Error />}</div>
        <div className="flex justify-center items-center">{success && <Success />}</div>
      </div>
      <form className='loginscreen' onSubmit={handleLogin}>
        <div className='main'>
          <div className='emaildiv'>
            <p className='emailp'>Email</p>
            <input
              className='emailinput'
              type='email'
              name="email"
              id="email"
              placeholder='Email'
              autoComplete="off"
              value={input.email}
              onChange={(e) => setInput({
                ...input,
                [e.target.name]: e.target.value,
              })}
            />
          </div>
          <div className='passdiv'>
            <p className='passwordp'>Password</p>
            <input
              className='passinput'
              type='text'
              name="password"
              id="password"
              placeholder='Password'
              autoComplete="off"
              value={input.password}
              onChange={(e) => setInput({
                ...input,
                [e.target.name]: e.target.value,
              })}
            />
          </div>
          <div className='btnlogin'>
            <button className='loginbtn' type="submit">Login</button>
          </div>
          <div className='btncreate'>
            <button className='createbtn' type="button" onClick={createFunc}>Create new account</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;














// import { useContext, useEffect, useState } from "react";
// import "../App.css"
// import { useNavigate } from "react-router-dom"
// import Success from "./Success";
// import Error from "./Error";
// import { StateContext } from "../state";
// const Login = () => {

//     const { input, setInput, error, setError, success, setSuccess, Successtimer, Errortimer } = useContext(StateContext)

//     const login = () => {
//         localStorage.setItem('login', true)
//         navigate("/");
//     }

//     const [isLogin, setIsLogin] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         let login = localStorage.getItem("login");
//         if (login) {
//           navigate("/");
//         }
//     }, []);
    

//     const createFunc = () => {
//         navigate("/signup")
//     }

//     const handleLogin = (e) => {
//         e.preventDefault();
//         const loggeduser = JSON.parse(localStorage.getItem("user"));
//         if(input.email === loggeduser.email && input.password === loggeduser.password) {
//             localStorage.setItem("loggedin", true)
//             login()
//             setSuccess(true)
//             Successtimer()
//             navigate("/")
//         }else {
//             setError(true)
//             Errortimer()
//         }
//     }

//     return (
//         <div>
//             <div className="h-20">
//             <div className="flex justify-center items-center">{error && <Error />}</div>
//             <div className="flex justify-center items-center">{success && <Success />}</div>
//             </div>
//             <form className='loginscreen' onSubmit={handleLogin}>
//                 <div className='main'>
//                     <div className='emaildiv'>
//                         <p className='emailp'>Email</p>
//                         <input className='emailinput' type='email' name="email" id="email" placeholder='Email' autoComplete="off" value={input.email} onChange={(e) => setInput({
//                                 ...input,
//                                 [e.target.name]: e.target.value,
//                             })}/>
//                     </div>
//                     <div className='passdiv'>
//                         <p className='passwordp'>Password</p>
//                         <input className='passinput' type='text' name="password" id="password" placeholder='Password' autoComplete="off" value={input.password} onChange={(e) => setInput({
//                                 ...input,
//                                 [e.target.name]: e.target.value,
//                             })}/>
//                     </div>
//                     <div className='btnlogin'>
//                         <button className='loginbtn' type="submit">Login</button>
//                     </div>
//                     <div className='btncreate'>
//                         <button className='createbtn' type="submit" onClick={createFunc}>Create new account</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Login































// login screen 2 sign or login

// login form
// neeche ek link hoga signup k liye


// lekin age login krega  to sirf match krega password or email

// or agr signup krega to local storage me save krega



//  form submitted successfully
//  name , phone, sab kyuc
//  ek useffect me store krna  // check krkeba agr fuc se hojae