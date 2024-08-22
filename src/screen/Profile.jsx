import { Link } from 'react-router-dom'
import { PiIdentificationCardBold } from "react-icons/pi";

function Profile() {

  const inputLocalSt = localStorage.getItem("input");

  return (
    <div className=''>
    <div className='bg-white text-black mt-1.1 border-4 border-black rounded-lg right-0 w-72 h-96 z-10 absolute'>
      <div className='flex justify-center itecent-center'>
      </div>
      <br/>
      <div>
        <Link>{inputLocalSt === null ? null : <Link className='flex border-2 border-black' to={"/profileview"}>ProfileView <span className='text-2xl text-blue-500'><PiIdentificationCardBold /></span> </Link>}</Link>
      </div>
      <br/>
      <button className='border-2 flex justify-start border-black w-full mt-64'>{inputLocalSt === null ? <Link to={"/login"}>Login</Link> : <Link to={"/logout"}>Logout</Link>}</button>      
</div>
</div>
  )
}

export default Profile

