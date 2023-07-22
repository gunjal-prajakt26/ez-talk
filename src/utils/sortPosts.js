export const sortPosts = (getPosts, filter) => {  
    if (filter === "Latest") {
      return [...getPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
  
    if (filter === "Trending") {
      return [...getPosts].sort((a, b) => (b.likes.likeCount) - (a.likes.likeCount));
    }
  
    return getPosts;
  };
    