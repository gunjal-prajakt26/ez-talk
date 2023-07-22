import { Avtar } from "../Avtar/Avtar"

export const NewPostModal=(data)=>{
    return (
        <div class="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="post-container new-post">
              <Avtar postUsername={data.user.username} />
              <div class="post-content">
                <textarea
                  class="form-control input-text"
                  placeholder="Write new post..."
                ></textarea>
                <div className="post-operations">
                  <span className="post-icons">
                    <i class="bi bi-card-image"></i>
                  </span>
                  <button className="btn-post">Post</button>
                </div>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
    )
}