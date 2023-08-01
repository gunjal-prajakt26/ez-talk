export const updateProfileService = async (editInput, setData, setUser) => {
  try {
    const res = await fetch("/api/users/edit", {
      method: "POST",
      body: JSON.stringify({ userData: editInput }),
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    const jsonRes = await res.json();
    if (res.status === 201) {
      setData({ type: "UPDATE_USERLIST", payload: jsonRes.user });
      setUser(jsonRes.user)
    }
  } catch (err) {
    console.log(err);
  }
};
