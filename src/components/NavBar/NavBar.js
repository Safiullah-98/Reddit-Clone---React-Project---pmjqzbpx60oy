import Logo from "../../utils/logo"
import "./Navbar.css"
import {loginContext, postContext, userContext} from "../../App"
import { useContext } from "react";


export default function Navbar(){
    const [user, setUser] = useContext(userContext);
    let login = useContext(loginContext);
    let post = useContext(postContext);

 return(
    <nav className="nav">
        <Logo />
        <div><button onClick={()=>{user? post(true) : login(true)}}>Add Post</button></div>
         {    user?
            <h2><i className="fa fa-user"></i>{user}</h2>:
            <div><button onClick={()=>login(true)}>Log In</button></div> 
         }   
    </nav>
 )
}

