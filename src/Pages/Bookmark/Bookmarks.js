import axios from "axios";
import { useContext, useEffect } from "react";
import { Post } from "../../Components/Post/Post";
import { DataContext } from "../../Context/DataContext";

export function Bookmarks(){

    const {
        data: {allPosts, bookmarks },
        setData,
      } = useContext(DataContext);

    const getBookmarks = async () => {
        try {
            const response = await axios.get("/api/users/bookmark/", {headers: { authorization: localStorage.getItem("token") }})
            if(response.status === 200) {
                setData({type: "SET_BOOKMARKS", payload: response.data.bookmarks})
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const getBookmarkedList= bookmarks.map((obj)=>allPosts.find(({_id})=>obj==_id));
    useEffect(() => {
        getBookmarks();
    }, [])

    return (
        <div className="home-page">
            <h1 className="home-title">Bookmarks</h1>
            <div>
        {
            getBookmarkedList.length > 0
            ?getBookmarkedList.map((obj) => <Post post={obj} />)
            :<p className="empty-page">No Bookmarks</p>
        }
      </div>
        </div>
    )
}