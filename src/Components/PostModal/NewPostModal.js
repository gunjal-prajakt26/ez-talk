import { XCircle } from "lucide-react";
import { useState } from "react";
import { createPost } from "../../utils/editDeletePost";
import { Avtar } from "../Avtar/Avtar";

export const NewPostModal = (props) => {
  const { postInfo, token, user, setData } = props;
  const [inputData, setInputData] = useState({ ...postInfo });

  const imageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setInputData((postdata) => ({ ...postdata, mediaURL: imageUrl }));
  };

  const postClickHandler = () => {
    createPost(token, inputData, user, setData);
    setInputData((inputData) => ({ ...inputData, content: "", mediaURL: "" }));
  };
  
  const closeClickHandler=()=>{
    setInputData((inputData) => ({ ...inputData, content: "", mediaURL: "" }));

  }
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="post-container new-post">
          <Avtar postUsername={user.username} />
          <div class="post-content">
            <textarea
              class="form-control input-text"
              placeholder="Write new post..."
              value={inputData.content}
              onChange={(e) =>
                setInputData((inputData) => ({
                  ...inputData,
                  content: e.target.value,
                }))
              }
            ></textarea>
            <div>
            {inputData.mediaURL.length !==0 && (
              <div className="img-preview-modal">
                <img src={inputData.mediaURL} className="post-img" />
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
            </div>
            <div className="post-operations">
              <span className="post-icons">
                <label htmlFor="media-input-mdl-2">
                  <i class="bi bi-card-image"></i>
                </label>
                <input
                  key={inputData.mediaURL}
                  type="file"
                  id="media-input-mdl-2"
                  name="media-input-mdl-2"
                  className="choose-file"
                  onChange={imageUploadHandler}
                />
              </span>
              <button
                className={
                  inputData.content?.trim().length === 0 &&
                  inputData.mediaURL.length === 0
                    ? "disabled"
                    : "btn-post"
                }
                disabled={
                  inputData.content?.trim().length === 0 &&
                  inputData.mediaURL.length === 0
                }
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => postClickHandler()}
              >
                Post
              </button>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={()=>closeClickHandler()}
          ></button>
        </div>
      </div>
    </div>
  );
};
