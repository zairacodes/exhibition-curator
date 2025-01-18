import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" />
        <Route path="/home" />
        <Route path="/myexhibitions" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
