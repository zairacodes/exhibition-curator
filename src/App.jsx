import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MyExhibitions from "./pages/MyExhibitions";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myexhibitions" element={<MyExhibitions />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
