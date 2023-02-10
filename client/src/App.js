import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "screens/homePage";
import LoginPage from "screens/loginPage";
import ProfilePage from "screens/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/auth" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/auth" />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;