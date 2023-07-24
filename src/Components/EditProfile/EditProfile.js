export function EditProfile({user}){
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
      } =user;

    return (
        <div class="modal-dialog">
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
              <img
          className="header-img"
          src={
            header
              ? header
              : "https://media.istockphoto.com/id/1040250650/photo/white-studio-background.jpg?b=1&s=612x612&w=0&k=20&c=s8OzauvZiYTcWi57nFXVe7oYWJ7Ul0IMN0MNIySkc1M="
          }
        />
        <img
          className="avatar-img"
          src={
            avatar
              ? avatar
              : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          }
        /></div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
    )
}