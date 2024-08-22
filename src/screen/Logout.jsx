import { useContext } from 'react'
import { StateContext } from '../state'
import { useNavigate } from 'react-router-dom'
import Header from './Header'

const Logout = () => {

  const { input } = useContext(StateContext)

  const navigate = useNavigate();

    const LogoutFunc = () => {
      localStorage.removeItem("loggedin");
      localStorage.removeItem("login");
      localStorage.removeItem("input");
      input.email = ""
      input.password = ""
        navigate("/")
    }

//     const { loggout } = useContext(StateContext)
//   const navigate = useNavigate();
//     const LogoutFunc = () => {
//         loggout()
//         navigate("/login")
//     }

  return (
    <div>
      <Header />
      <div className='logoutmain'>
        <div className='logoutdiv bg-gray-100'>
          <h1 className='logouthone text-black'>Logout</h1>
          <button className='logoutbtn' onClick={LogoutFunc}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Logout
