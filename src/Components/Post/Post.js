import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { Avtar } from "../Avtar/Avtar";
import "./Post.css";

export function Post({post}){

    const {data, setData}= useContext(DataContext);
    const {_id,content,likes,username,fullName,postImage,createdAt,updatedAt,comments}=post;

    const getPostedTime = () => {
        const date = new Date(createdAt);
        const options = { month: "short", day: "numeric" };
        let formattedDate = date.toLocaleString("en-US", options);
        if (date.getFullYear() < 2023) {
            formattedDate += ", " + (date.getFullYear());
        }
        return formattedDate;
    }


    return (
        < div className="post-container">
            <Avtar postUsername={username} fullName={fullName}/>
            <div className="post-content">
            <div className="user-info">
            <div className="user-details">
            <p className="fullName">{fullName}</p>
            <p className="userName">@{username}</p>
            </div>
            <p className="post-date">·{getPostedTime()}</p>
            </div>
            </div>
        </div>
    )
}