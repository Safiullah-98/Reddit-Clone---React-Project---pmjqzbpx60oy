import "./Post.css"
import { useContext, useState } from "react";
import { userContext, loginContext, postListContext } from "../../App";

export default function Post(){
    const [posts, setPosts] = useContext(postListContext);
    const [user, setUser] = useContext(userContext);
    const login = useContext(loginContext);
    const styleIcon = {color: "black"}
    const handleVoteClick = ({index, type})=>{
      if (user) {
        if(posts[index].notVoted === null){
            let newPosts =  posts.map((obj, i)=>{
                if(i === index){
                 return (type === 'add')?{...obj, upVotes: obj.upVotes+1, notVoted: "up"}:{...obj, downVotes: obj.downVotes-1, notVoted: "down"}
                }else{
                 return {...obj}
                }
             })
             window.localStorage.setItem("posts", JSON.stringify(newPosts));
             setPosts(JSON.parse(window.localStorage.getItem("posts")))
         }
        }
        else{
            login(true)
        }
       
    }

    return(
        <div className="postContainer">
            {
                posts.map((obj,i)=>{
                    return(
                    <div className="posts" key={i}>
                    <div className="voteBar">
                    <div>
                    <i style={(obj.notVoted === 'up')?styleIcon: {}} onClick={()=>handleVoteClick({index: i, type: 'add'})} className="fa fa-arrow-up"></i>
                        <p>{obj.upVotes}</p>
                    </div>
                    <div><i  style={(obj.notVoted === 'down')?styleIcon: {}} onClick={()=>handleVoteClick({index: i, type: 'sub'})} className="fa fa-arrow-down"></i>
                    <p>{obj.downVotes}</p></div>
                    </div>
                    <div>
                    <p>{obj.title}</p>
                    <p>{obj.description}</p>
                    </div>
                    </div>
                    )
                })

            }
        </div>
    )
}

