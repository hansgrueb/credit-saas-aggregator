
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <div className="w-20 h-1 bg-light-blue mx-auto mb-6"></div>
        <p className="text-2xl text-gray-700 mb-6">Page not found</p>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-light-blue hover:bg-navy transition-colors">
          <NavLink to="/">
            Return to Home
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
