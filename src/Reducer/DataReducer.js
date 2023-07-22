

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
  
      default:
        break;
    }
  };