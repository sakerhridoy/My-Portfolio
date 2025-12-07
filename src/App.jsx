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
import About from './Components/About';
import Experience from './Components/Experience';
import Timeline from './Components/Timeline';
import Testimonials from './Components/Testimonials';
import FAQ from './Components/FAQ';
import Resume from './Components/Resume';
import Achievements from './Components/Achievements';
import FeaturedProjects from './Components/FeaturedProjects';
import GitHubActivity from './Components/GitHubActivity';
import Blog from './Components/Blog';

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
              <About />
              <Experience />
              <Timeline />
              <Achievements />
              <FeaturedProjects/>
              <Service />
              <Project />
              <GitHubActivity />
              <Blog/>
              <Testimonials />
              <FAQ/>
              <Plans />
              <Resume/>
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
