import {ImagePlus } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { profileImages } from "../../utils/profileAvatars";
import { updateProfileService } from "../../utils/profileService";
import { SelectAvatar } from "../SelectAvatar/SelectAvatar";
import "./EditProfile.css";

export function EditProfile() {
  const {
    data: {  users }, setData} = useContext(DataContext);
    const { user, setUser } = useContext(AuthContext);
    // const currUser= users.find(({_id})=>_id===user._id)
    const [isAvatarClick, setIsAvatarClick]=useState(false);
const [profileData, setProfileData]= useState(user);
  const {
    _id,
    firstName,
    lastName,
    username,
    password,
    avatar,
    header,
    followers,
    following,
    bookmarks,
    bio,
    website,
    location,
    createdAt,
    updatedAt,
  } = profileData;

  const imageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setProfileData((postdata) => ({ ...postdata, avatar: imageUrl }));
  };
  const bgImageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setProfileData((postdata) => ({ ...postdata, header: imageUrl }));
  };

  return (
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Edit Profile
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div className="profile-edit-img">
            <input type="image"
              className="header-img"
              src={
                header
                  ? header
                  : "https://media.istockphoto.com/id/1040250650/photo/white-studio-background.jpg?b=1&s=612x612&w=0&k=20&c=s8OzauvZiYTcWi57nFXVe7oYWJ7Ul0IMN0MNIySkc1M="
              }
            />
            <span type="span" className="bg-img-icon dropdown-icon"><label htmlFor="media-input-mdl-5"><ImagePlus size={32} strokeWidth={2.5} /></label><input
              key={user.avatar}
              type="file"
              id="media-input-mdl-5"
              name="media-input-mdl-5"
              className="choose-file"
              onChange={(e)=>bgImageUploadHandler(e)}
            /></span>
            <img
              className="avatar-img"
              src={
                avatar
                  ? avatar
                  : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
              }
            />
            <div>
            <span type="span" className="profile-edit-icon dropdown-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"><ImagePlus size={32} strokeWidth={2.5} /></span>
            <ul class="dropdown-menu">
                <span className="dropdown-item" onClick={()=>setIsAvatarClick(true)}>Set Avatar</span>
                <span className="dropdown-item"><label htmlFor="media-input-mdl-4">Upload Image</label> <input
              key={user.avatar}
              type="file"
              id="media-input-mdl-4"
              name="media-input-mdl-4"
              className="choose-file"
              onChange={imageUploadHandler}
            /></span>
              </ul>
              </div>
          </div>
              {isAvatarClick &&
              <div className="avatar-container">
              <h4>Choose Avatar</h4>
              <hr/>
              <div className="avatar-list-conatiner">
              {
                profileImages.map((obj)=>(
                    <SelectAvatar avatar={obj} setIsAvatarClick={setIsAvatarClick} setProfileData={setProfileData}/>
                ))
              }</div>
              <button
            type="button"
            class="btn-close avatar-close"
            onClick={()=>setIsAvatarClick(false)}
          ></button>
              </div>
              }
          <div className="profile-info">
            <div class="mb-3">
              <label for="exampleFormControlInput1" >
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="First Name"
                value={firstName}
                onChange={(e)=>setProfileData((data)=>({...data, firstName:e.target.value}))}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput2" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput2"
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=>setProfileData((data)=>({...data, lastName:e.target.value}))}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput4" class="form-label">
                Bio
              </label>
              <input
              type="text"
                class="form-control"
                id="exampleFormControlInput4"
                placeholder="Your Bio"
                value={bio}
                onChange={(e)=>setProfileData((data)=>({...data, bio:e.target.value}))}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput5" class="form-label">
                Location
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput\5"
                placeholder="Your Location"
                value={location}
                onChange={(e)=>setProfileData((data)=>({...data, location:e.target.value}))}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput6" class="form-label">
                WebSite Link
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput6"
                placeholder="Your Website Link"
                value={website}
                onChange={(e)=>setProfileData((data)=>({...data, website:e.target.value}))}
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary"
            data-bs-dismiss="modal" onClick={()=>updateProfileService({
          ...user,
          ...profileData,
        },setData, setUser)}> 
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
