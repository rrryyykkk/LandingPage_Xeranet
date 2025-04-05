import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './context/ThemeContext';
import { HeroSettingsProvider } from './contexts/HeroSettingsContext.jsx';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Users from './pages/Users';
import Hero from './pages/Hero';
import Testimonials from './pages/Testimonials';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 menit
      cacheTime: 30 * 60 * 1000, // 30 menit
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HeroSettingsProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/users" element={<Users />} />
                <Route path="/hero" element={<Hero />} />
                <Route path="/testimonials" element={<Testimonials />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </HeroSettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 