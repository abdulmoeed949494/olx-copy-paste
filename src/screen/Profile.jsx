// import { useContext } from 'react'
// import { StateContext } from '../state'
import { Link } from 'react-router-dom'
import { PiIdentificationCardBold } from "react-icons/pi";

function Profile() {

  // const { input } = useContext(StateContext)

  // const navigate = useNavigate();

  //   const LogoutFunc = () => {
  //     localStorage.removeItem("loggedin");
  //     localStorage.removeItem("login");
  //     input.email = ""
  //     input.password = ""
  //       // navigate("/login")
  //   }

  const inputLocalSt = localStorage.getItem("input");

  return (
    <div>
    <div className='bg-white text-black border-4 mt-1 border-black rounded-lg right-0 w-72 h-96 z-10 absolute'>
      <div className='flex justify-center itecent-center border-2 border-black'>
      </div>
      <br/>
      <div className=''>
        {/* <Link className='flex' to={"/profileview"}>{SignupInput.name.length === 0 && SignupInput.phone.length === 0 && SignupInput.adress.length === 0 && SignupInput.email.length === 0 ? null : <Link className='flex border-2 border-black' to={"/profileview"}>ProfileView <span className='text-2xl text-blue-500'><PiIdentificationCardBold /></span> </Link>} </Link> */}
        <Link>{inputLocalSt === null ? null : <Link className='flex border-2 border-black' to={"/profileview"}>ProfileView <span className='text-2xl text-blue-500'><PiIdentificationCardBold /></span> </Link>}</Link>
      </div>
      <br/>
      <button className='border-2 flex justify-start border-black w-full'>{inputLocalSt === null ? <Link to={"/login"}>Login</Link> : <Link to={"/logout"}>Logout</Link>}</button>
      {/* <button className='border-2 flex justify-start border-black w-full'>{input.email.length === 0 && input.password.length === 0 ? <Link to={"/login"}>Login</Link> : <Link to={"/logout"}>Logout</Link>}</button> */}
    {/* <button onClick={LogoutFunc}>Logout</button> */}
      
</div>
</div>
  )
}

export default Profile

