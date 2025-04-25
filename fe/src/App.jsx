import { Route, Routes, useLocation } from "react-router-dom";
// landingPage
import Hero from "./components/LandingPage/Hero";
import Service from "./components/LandingPage/Service";
import Testimoni from "./components/LandingPage/Testimoni";
import About from "./pages/LandingPage/About";
import Contact from "./pages/LandingPage/Contact";
import Blog from "./pages/LandingPage/blog/Blog";
// admin
import BlogAdmin from "./pages/Admin/Blog";
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
import IklanPopUp from "./components/LandingPage/IklanPopUp";
import LogoPt from "./pages/Admin/LogoPt";
import LoginPage from "./pages/Auth/Login";
import ProfilePage from "./pages/Admin/Profile";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import NotificationsPage from "./pages/Admin/Notification";
import Iklan from "./pages/Admin/Iklan";
import Hero2 from "./components/LandingPage/Hero2";
import ServicePage from "./pages/LandingPage/service/ServicePage";

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
                <Hero2 />
                <Service />
                <Testimoni />
                <LogoPartner />
                <IklanPopUp />
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
          path="/service"
          element={
            <LandingPageLayout>
              <ServicePage />
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
          <Route
            index
            element={
              <ProtectedRoutes>
                <DashboardAdmin />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="blog"
            element={
              <ProtectedRoutes>
                <BlogAdmin />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="users"
            element={
              <ProtectedRoutes>
                <UsersAdmin />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="testimonials"
            element={
              <ProtectedRoutes>
                <TestimonialsAdmin />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="hero"
            element={
              <ProtectedRoutes>
                <HeroAdmin />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="iklan"
            element={
              <ProtectedRoutes>
                <Iklan />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="logo-partner"
            element={
              <ProtectedRoutes>
                <LogoPt />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <ProfilePage />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="notification"
            element={
              <ProtectedRoutes>
                <NotificationsPage />
              </ProtectedRoutes>
            }
          ></Route>
        </Route>
        {/* Admin-end */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
