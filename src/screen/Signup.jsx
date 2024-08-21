import { useContext, useEffect } from "react";
import "../App.css"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../state";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";


function Signup() {

    const { SignupInput, setInput, userInput, setSignupInput, handleOrderPlacement, setIsLogin } = useContext(StateContext)

    const navigate = useNavigate();



    useEffect(() => {
        const login = localStorage.getItem("login");
        if (login) {
          setIsLogin(true);
          navigate("/");
        }
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (SignupInput.email.length < 2 || SignupInput.password.length < 2) {
            alert("Please Login");
            navigate("/login");
        } else {
            try {
                await createUserWithEmailAndPassword(auth, SignupInput.email, SignupInput.password);
                const user = auth.currentUser;
                console.log(user);
                console.log("User Registered Successfully!!");    
                alert("User Registered Successfully!!");
                navigate("/orderplaced");
                // const userInput = {
                //     email: SignupInput.email,
                //     password: SignupInput.password,
                // };
                setInput(userInput);
                localStorage.setItem("input", JSON.stringify(userInput));
                localStorage.setItem("user", JSON.stringify(SignupInput));
                localStorage.setItem("userCart", JSON.stringify([]));
                localStorage.setItem("loggedin", true);
                localStorage.setItem("login", true);
                handleOrderPlacement();
                handleAdmin();
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const handleAdmin = () => {
        if(SignupInput.email === "AdminPage0909@gmail.com"){
            navigate("/")
        }
      }

    return (
        <div>
            <div>
                <div className="h-20">
                </div>
                <form className='signupscreen' onSubmit={handleSubmit}>
                    <div className='mainSignup'>
                        
                        <div className='namedivSignup'>
                            <p className='namepSignup'>Name</p>
                            <input className='nameinputSignup' type='name' name="name" id="name" placeholder='Name' autoComplete="off" value={SignupInput.name} onChange={(e) => setSignupInput({
                                ...SignupInput,
                                [e.target.name]: e.target.value,
                            })} />
                        </div>

                        <div className='namedivSignup'>
                            <p className='namepSignup'>Phone</p>
                            <input className='nameinputSignup' type='phone' name="phone" id="phone" placeholder='Phone' autoComplete="off" value={SignupInput.phone} onChange={(e) => setSignupInput({
                                ...SignupInput,
                                [e.target.name]: e.target.value,
                            })} />
                        </div>

                        <div className='namedivSignup'>
                            <p className='namepSignup'>Adress</p>
                            <input className='nameinputSignup' type='adress' name="adress" id="adress" placeholder='Adress' autoComplete="off" value={SignupInput.adress} onChange={(e) => setSignupInput({
                                ...SignupInput,
                                [e.target.name]: e.target.value,
                            })} />
                        </div>

                        <div className='emaildivSignup'>
                            <p className='emailpSignup'>Email</p>
                            <input className='emailinputSignup' type='email' name="email" id="email" placeholder='Email' autoComplete="off" value={SignupInput.email} onChange={(e) => setSignupInput({
                                ...SignupInput,
                                [e.target.name]: e.target.value,
                            })}/>
                        </div>
                        <div className='passdivSignup'>
                            <p className='passwordpSignup'>Password</p>
                            <input className='passinputSignup' type='text' name="password" id="password" placeholder='Password' autoComplete="off" value={SignupInput.password} onChange={(e) => setSignupInput({
                                ...SignupInput,
                                [e.target.name]: e.target.value,
                            })} />
                        </div>
                        <div className='btnloginSignup'>
                            <button className='loginbtnSignup' type="submit" onClick={handleSubmit}>Signup</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
