import "./SelectAvatar.css"
export function SelectAvatar({avatar,setIsAvatarClick}){
    return (
        <div className="avatar-list">
            <img className="avatar-list-img" src={avatar} alt="" onClick={()=>setIsAvatarClick(false)}/>
        </div>
    )
}