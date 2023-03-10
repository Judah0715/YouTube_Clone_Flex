
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import YoutubePage from "./pages/YoutubePage/YoutubePage";
import SearchResults from "./pages/SearchResultsPage/SearchResults";
import VideoPage from "./pages/VideoPage/VideoPage";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SearchBar from "./components/SearchBar/SearchBar";
import PrivateRoute from "./utils/PrivateRoute";
import { useState } from "react";




function App() {
  
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (searchQuery) => {
  navigate(`/searchResults/${searchQuery}/`, { state: { from: location }})

  }

  
  return (
    <div>
      <Navbar />
      <div className="searchBar">
      <SearchBar onSearch={handleSearch}/>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <YoutubePage />
            </PrivateRoute>
          }
        />
        <Route path= '/searchResults/:searchQuery/' element={<SearchResults />} />
        <Route path= '/videoPage/:videoId/' element={<VideoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;