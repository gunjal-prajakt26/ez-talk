import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./Avtar.css";

export function Avtar({postUsername}){

    const {data:{users}, setData}= useContext(DataContext);
    // const {_id,content,likes,username,fullName,postImage,createdAt,updatedAt,comments}=post;

    const getAvtar= users.find(({ username }) => postUsername == username)?.avatar
    return (
        <div class="avtar-container">
            <img class="avtar" src={getAvtar}/>
        </div>
    )
}