import { useContext } from 'react'
import { StateContext } from '../state'
import Header from './Header'

const ProfileView = () => {

    const { SignupInput } = useContext(StateContext)

  return (
    <div>
      <Header />
    <div className='flex text-3xl justify-start items-center h-screen'>
      <div className='ml-20'>
        <h1 className=' rounded-lg mb-20 border-2 border-black'>Name: {SignupInput.name}</h1>
        <h1 className=' rounded-lg mb-20 border-2 border-black'>Phone: Number: {SignupInput.phone}</h1>
        <h1 className=' rounded-lg mb-20 border-2 border-black'>Adress: {SignupInput.adress}</h1>
        <h1 className=' rounded-lg mb-20 border-2 border-black'>Email: {SignupInput.email}</h1>
        </div>
    </div>
    </div>
  )
}

export default ProfileView
