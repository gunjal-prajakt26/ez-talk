import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home/Home";
import { Bookmarks } from "./Pages/Bookmarks";
import { SearchPage } from "./Pages/Suggestion/SearchPage";

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
          </Routes>
        </div>
        <SearchPage />
      </div>
    </div>
  );
}

export default App;
