import { Route, Routes, useLocation } from "react-router-dom";
// landingPage
import Hero from "./components/LandingPage/Hero";
import Service from "./components/LandingPage/Service";
import Testimoni from "./components/LandingPage/Testimoni";
import About from "./pages/LandingPage/About";
import Contact from "./pages/LandingPage/Contact";
import Blog from "./pages/LandingPage/blog/Blog";
// admin
import BlogAdmin from "./pages/Admin/Blog.Admin";
import UsersAdmin from "./pages/Admin/Users";
import TestimonialsAdmin from "./pages/Admin/Testimonials";
import HeroAdmin from "./pages/Admin/Hero";
import DashboardAdmin from "./pages/Admin/Dashboard";
import { useEffect } from "react";
import BlogDetail from "./pages/LandingPage/blog/BlogDetail";
import LandingPageLayout from "./Layout/LandingPageLayout";
import AdminLayout from "./Layout/AdminLayout";
import { AdminThemeProvider } from "./context/ThemeContext";
import LogoPartner from "./components/LandingPage/LogoPartner";

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
      {/* landing Page-start */}
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPageLayout>
                <Hero />
                <Service />
                <LogoPartner />
                <Testimoni />
              </LandingPageLayout>
            </>
          }
        />

        <Route
          path="/about"
          element={
            <LandingPageLayout>
              <About />
            </LandingPageLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <LandingPageLayout>
              <Contact />
            </LandingPageLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <LandingPageLayout>
              <Blog />
            </LandingPageLayout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <LandingPageLayout>
              <BlogDetail />
            </LandingPageLayout>
          }
        />
        {/* landing Page-end */}

        {/* Admin-start */}
        <Route
          path="/admin"
          element={
            <AdminThemeProvider>
              <AdminLayout />
            </AdminThemeProvider>
          }
        >
          <Route index element={<DashboardAdmin />}></Route>
          <Route path="blog" element={<BlogAdmin />}></Route>
          <Route path="users" element={<UsersAdmin />}></Route>
          <Route path="testimonials" element={<TestimonialsAdmin />}></Route>
          <Route path="hero" element={<HeroAdmin />}></Route>
        </Route>
        {/* Admin-end */}
      </Routes>
    </>
  );
}

export default App;
