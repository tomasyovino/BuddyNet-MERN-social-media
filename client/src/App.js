import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "screens/homePage";
import LoginPage from "screens/loginPage";
import ProfilePage from "screens/profilePage";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;