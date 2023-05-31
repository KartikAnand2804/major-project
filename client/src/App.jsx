import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserContextProvider from "./context/UserContext";
import WalletContextProvider from "./context/WalletContext";
import RideContextProvider from "./context/RideContext";
import Report from "./components/Report";
import ResearchPaper from "./components/ResearchPaper";

function App() {
  return (
    <UserContextProvider>
      <RideContextProvider>
        <WalletContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/report" element={<Report />} />
              <Route path="/research-paper" element={<ResearchPaper />} />
            </Routes>
          </BrowserRouter>
        </WalletContextProvider>
      </RideContextProvider>
    </UserContextProvider>
  );
}

export default App;
