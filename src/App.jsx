import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Plans from './Components/Plans';
import Project from './Components/Projects';
import Service from './Components/Service';
import ThankYou from './Components/Thankyou';

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Main Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Service />
              <Project />
              <Plans />
              <Contact />
            </>
          }
        />

        {/* Thank you redirect page */}
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
