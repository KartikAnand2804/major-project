import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserContextProvider from "./context/UserContext";
import WalletContextProvider from "./context/WalletContext";
import RideContextProvider from "./context/RideContext";

function App() {
  return (
    <UserContextProvider>
      <WalletContextProvider>
        <RideContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </RideContextProvider>
      </WalletContextProvider>
    </UserContextProvider>
  );
}

export default App;
