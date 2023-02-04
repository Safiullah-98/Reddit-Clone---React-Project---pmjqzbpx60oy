
import React, { useContext, useState } from "react";
import { loginContext, userContext} from "../../App";
import "./user.css";

export default function EntryCard(props) {
  const [cardType, setCardType] = useState(props.type);
  const [user, setUser] = useContext(userContext)
  const login = useContext(loginContext);
  const [error, setError] = useState(false);
  
  const [loginCredentials, setLoginCredentials] = useState({
      username: "",
      password: "",
    });
    
  const handleClick = () => {
    if (cardType === "Login") setCardType("Sign Up");
    else setCardType("Login");
    setError(false)
    setLoginCredentials({username: "", password:""})
  };

  const handleLoginCredentials = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardType === "Login") {
      const allUsers = JSON.parse(window.localStorage.getItem("users"));
      const findUser = allUsers.filter(
        (userObj) =>
          userObj.username === loginCredentials.username &&
          userObj.password === loginCredentials.password
      );
      if (findUser.length === 1) {
       setUser(findUser[0].username)
       login(false)
      }else{ setError(true)}
    } else {
      const allUsers = JSON.parse(window.localStorage.getItem("users"));
       allUsers.push(loginCredentials);
       window.localStorage.setItem("users", JSON.stringify(allUsers));
       setUser(loginCredentials.username);
       login(false);
    }
  };

  return (
    <div className="formCard">
      <div className="layer"></div>
      <form onSubmit={handleSubmit}>
        <i onClick={() => login(false)} className="fa fa-times cross"></i>
        {error && <p className="error">Username or Password does not match</p>}
        <h1>{cardType}</h1>
        <input
          type="text"
          value={loginCredentials.username}
          onChange={handleLoginCredentials}
          name="username"
          placeholder="Enter username"
          required
        />
        <input
          type="text"
          value={loginCredentials.password}
          onChange={handleLoginCredentials}
          name="password"
          placeholder="Enter password"
          required
        />
        <button type="submit">{cardType}</button>
        {cardType === "Login"? <p onClick={()=>handleClick()} className="link" >
          Create a New Account
        </p>:
        <p onClick={()=>handleClick()} className="link">
           Login
        </p>
        }
      </form>
    </div>
  );
}
