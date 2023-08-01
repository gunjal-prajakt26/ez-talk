import "./SelectAvatar.css"
export function SelectAvatar({avatar,setIsAvatarClick, setProfileData}){

    const clickHandler=()=>{
        setIsAvatarClick(false);
        setProfileData((postdata) => ({ ...postdata, avatar: avatar }));
    }
    return (
        <div className="avatar-list">
            <img className="avatar-list-img" src={avatar} alt="" onClick={()=>clickHandler()}/>
        </div>
    )
}