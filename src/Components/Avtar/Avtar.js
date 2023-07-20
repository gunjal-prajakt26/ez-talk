import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import "./Avtar.css";

export function Avtar({postUsername}){

    const {data:{users}, setData}= useContext(DataContext);
    // const {_id,content,likes,username,fullName,postImage,createdAt,updatedAt,comments}=post;

    const getAvtar= users.find(({ username}) => postUsername === username)?.avatar
    console.log(getAvtar);
    return (
        <div class="avtar-container">
            <img class="avtar" src={getAvtar ? getAvtar :"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="}/>
        </div>
    )
}