import axios from "axios";
import { useContext, useEffect } from "react";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";

export function Bookmarks(){

    const {
        data: { bookmarks },
        setData,
        isLoad,
        isError,
      } = useContext(DataContext);
      const { user, token } = useContext(AuthContext);


    const getBookmarks = async () => {
        try {
            const response = await axios.get("/api/users/bookmark/", {headers: { authorization: token}})
            if(response.status === 200) {
                setData({type: "SET_BOOKMARKS", payload: response.data.bookmarks})
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBookmarks();
    }, [])

    return (
        <div className="home-page">
            <h1 className="home-title">Bookmarks</h1>
            <div>
        {
            bookmarks.map((obj) => <Post post={obj} />)
        }
      </div>
        </div>
    )
}