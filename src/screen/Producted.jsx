import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Producted(props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      navigate("/orderplaced");
    }
  }, [navigate]);

  return (
    <div>
      <props.Component />
    </div>
  );
}

export default Producted;













// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { StateContext } from "../state";

// function Producted(props) {

//   const { isLogin, setIsLogin } = useContext(StateContext) 

//   // const {Component} = props;
//   const navigate = useNavigate();
//   useEffect(() => {
//     let login = localStorage.getItem("/login");
//     if (!login) {
//       navigate("/login");
//     }
//   }, [isLogin]);
//   return (
//     <div>
//       <props.Component />
//     </div>
//   );
// }

// export default Producted;
