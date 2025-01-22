import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
