// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // Get the location object

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Depend on pathname for route changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;