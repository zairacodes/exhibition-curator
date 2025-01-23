import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArtworkDetail from "./pages/ArtworkDetail";
import MyExhibitions from "./pages/MyExhibitions";
import ExhibitionDetail from "./pages/ExhibitionDetail";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/artwork/:source/:id" element={<ArtworkDetail />} />
          <Route path="/myexhibitions" element={<MyExhibitions />} />
          <Route path="/exhibition/:id" element={<ExhibitionDetail />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
