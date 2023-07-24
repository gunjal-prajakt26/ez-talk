import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home/Home";
import { Bookmarks } from "./Pages/Bookmark/Bookmarks";
import { SearchPage } from "./Pages/Suggestion/SearchPage";
import { Explore } from "./Pages/Explore/Explore";
import { Profile } from "./Pages/Profile/Profile";
import { LoginPage } from "./Pages/Login/LoginPage";
import { SignupPage } from "./Pages/Signup/SignupPage";
import { PostDetail } from "./Pages/PostDetail/PostDetail";
import { AuthContext } from "./Context/AuthConetxt";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const { isLogin } = useContext(AuthContext);

  return (
    <div className="App">
      <div className="header-container">
      {isLogin && <Header />}
      </div>
      <div className="app-body">
      {isLogin && <Navbar />}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
            <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
            <Route path="profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="postDetail/:postId" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
        {isLogin && <SearchPage />}
      </div>
      <ToastContainer
        position='bottom-right'
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
}

export default App;
