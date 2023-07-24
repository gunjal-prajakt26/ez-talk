export const dispatch = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_POSTS":
      return { ...state, allPosts: [...payload] };
      break;
    case "SET_USERS":
      return { ...state, users: [...payload] };
      break;
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: [...payload] };
      break;
    case "SET_FILTER":
      return { ...state, filter: payload };
      break;

    case "UPDATE_USERLIST": {
      const updatedUserlist = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return { ...state, users: [...updatedUserlist] };
    }

    default:
      break;
  }
};
