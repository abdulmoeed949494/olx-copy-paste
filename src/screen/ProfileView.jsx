import { useContext } from 'react'
import { StateContext } from '../state'
import Header from './Header'

const ProfileView = () => {

    const { SignupInput } = useContext(StateContext)

    const localVari = localStorage.getItem("user")
    const localvar = JSON.parse(localVari)

  return (
    <div className=''>
      <Header />
    <div className='flex text-3xl justify-start items-center h-screen'>
      <div className='ml-20'>
        <h1 className='flex justify-center items-center rounded-lg h-20 w-[500px] mb-20 border-4 border-blue-400 '>Name: {localvar.name}</h1>
        <h1 className='flex justify-center items-center rounded-lg h-20 w-[500px] mb-20 border-4 border-blue-400 '>Phone: Number: {localvar.phone}</h1>
        <h1 className='flex justify-center items-center rounded-lg h-20 w-[500px] mb-20 border-4 border-blue-400 '>Adress: {localvar.adress}</h1>
        <h1 className='flex justify-center items-center rounded-lg h-20 w-[500px] mb-20 border-4 border-blue-400 '>Email: {localvar.email}</h1>
        </div>
    </div>
    </div>
  )
}

export default ProfileView
