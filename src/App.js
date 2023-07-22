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

function App() {
  return (
    <div className="App">
      <div className="header-container">
        <Header />
      </div>
      <div className="app-body">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="profile/:id" element={<Profile />} />
          </Routes>
        </div>
        <SearchPage />
      </div> 
    </div>
  );
}

export default App;
