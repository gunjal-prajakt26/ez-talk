import { useContext } from "react"
import { Post } from "../../Components/Post/Post";
import { DataContext } from "../../Context/DataContext"
import "./Home.css"

export function Home(){
    const {data:{allPosts}, setData}= useContext(DataContext);
    return (
        <div className="home-page">
            <h1 className="home-title">Home</h1>
            <div className="filter-container">
                <p>Trending</p>
                <p>Latest Posts</p>
            </div>
           <div>
            {
                allPosts.map((obj)=>(
                    <Post post={obj}/>
                ))
            }
           </div>
        </div>
    )
}