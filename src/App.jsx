import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import Plans from './Components/Plans';
import Project from './Components/Projects';
import Service from './Components/Service';
import ThankYou from './components/ThankYou';

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Service />
      <Project />
      <Plans />
      <Router>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App
