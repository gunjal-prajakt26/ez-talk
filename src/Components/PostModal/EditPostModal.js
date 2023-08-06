import { XCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { createPost, deletePost, editPost } from "../../utils/editDeletePost";
import { Avtar } from "../Avtar/Avtar";

export const EditPostModal = (props) => {
  const {editingPostId,setEditModal} = props;
  console.log(editingPostId)
  const {
    data: { allPosts },
    setData
  } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const editingPost = allPosts.find(({ _id }) => _id == editingPostId)

  const [inputData, setInputData] = useState(editingPost);

  const imageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setInputData((inputData) => ({ ...inputData, mediaURL: imageUrl }));
  };

  const postClickHandler = () => {
    editPost(token, inputData, setData);
    setEditModal(false);
  };

  return ReactDOM.createPortal(
    <div className="editmodal">
    <div className="edittweet-overlay"></div>
      <div className="modal-content-1 edittweet-modal">
        <div className="new-post-modal">
          <Avtar postUsername={editingPost.username} />
          <div class="post-content">
            <textarea
              class="form-control input-text"
              rows="1"
              placeholder="Write new post..."
              value={inputData.content}
              onChange={(e) =>
                setInputData((inputData) => ({
                  ...inputData,
                  content: e.target.value,
                }))
              }
            ></textarea>
            {inputData.mediaURL.length !==0 && (
              <div className="img-preview-modal">
                <img src={inputData?.mediaURL} className="post-img" />
                <span
                  className="close-icon-modal"
                  onClick={() =>
                    setInputData((inputData) => ({
                      ...inputData,
                      mediaURL: "",
                    }))
                  }
                >
                  <XCircle size={36} />
                </span>
              </div>
            )}
            <div className="post-operations media-input-container">
              <label htmlFor="media-input-mdl-1">
                <i class="bi bi-card-image"></i>
              </label>
              <input
                key={inputData.mediaURL}
                type="file"
                id="media-input-mdl-1"
                name="media-input-mdl-1"
                className="choose-file"
                onChange={imageUploadHandler}
              />
              <button className="btn-post"
              disabled={inputData.content?.trim().length === 0 && inputData.mediaURL.length === 0&&true} onClick={() => postClickHandler()}>
                Save Post
              </button>
            </div>
          </div>
        <button type="button" class="btn-close" onClick={()=>setEditModal(false)}></button>
        </div>
      </div>
      </div>, document.getElementById("portal")
  );
};
