import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/navbar/Navbar";
import Service from "./components/Service";
import Testimoni from "./components/Testimoni";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/blog/Blog";
import { useEffect } from "react";
import BlogDetail from "./pages/blog/BlogDetail";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "" && location.hash === "#service") {
      const element = document.getElementById("service");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
}

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Service />
              <Testimoni />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
