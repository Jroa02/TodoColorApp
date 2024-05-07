import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { MainPage } from "./pages/MainPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LogInPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/mainpage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
