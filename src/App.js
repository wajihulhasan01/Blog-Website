import './App.css';
import Blogspost from './MyComponents/blogspost';
import Header from "./MyComponents/header";
import Footer from "./MyComponents/footer";
import LandingPage from "./MyComponents/landingPage";
import About from './MyComponents/about';
import Contact from './MyComponents/contact';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './MyComponents/dashboard';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current path is '/dashboard'
  const isDashboard = location.pathname === '/dashboard';

  return (
    <>
      {/* Conditionally render Header and Footer */}
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogpost" element={<Blogspost />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
