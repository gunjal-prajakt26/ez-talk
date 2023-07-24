import { XCircle } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { createPost, deletePost, editPost } from "../../utils/editDeletePost";
import { Avtar } from "../Avtar/Avtar";

export const EditPostModal = (props) => {
  const {editingPostId} = props;
  const {
    data: { allPosts },
    setData
  } = useContext(DataContext);
  const { token } = useContext(AuthContext);
  const editingPost = allPosts.find(({ _id }) => _id === editingPostId)

  const [inputData, setInputData] = useState({...editingPost});

  const imageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setInputData((postdata) => ({ ...postdata, mediaURL: imageUrl }));
  };

  const postClickHandler = () => {
    editPost(token, inputData, setData);
  };
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div className="modal-content modal-content-1">
        <div className="post-container new-post">
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
              disabled={inputData.content?.trim().length === 0 && inputData.mediaURL.length === 0&&true} type="button" data-bs-dismiss="modal" aria-label="Close" onClick={() => postClickHandler()}>
                Save Post
              </button>
            </div>
          </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
      </div>
    </div>
  );
};
