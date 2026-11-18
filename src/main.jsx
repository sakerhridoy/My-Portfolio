import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import SmoothScroll from './Components/SmoothScroll';

// Disable browser scroll restoration so page always starts at top on reload/refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <SmoothScroll>
      <App />
  </SmoothScroll>
);
