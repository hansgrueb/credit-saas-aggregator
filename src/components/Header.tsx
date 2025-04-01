
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Menu, X } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-bold text-navy">
            Credit<span className="text-light-blue">AI</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/dashboard" className={({ isActive }) => 
            `text-base ${isActive ? 'text-light-blue font-medium' : 'text-gray-600 hover:text-navy'}`
          }>
            Dashboard
          </NavLink>
          <NavLink to="/models" className={({ isActive }) => 
            `text-base ${isActive ? 'text-light-blue font-medium' : 'text-gray-600 hover:text-navy'}`
          }>
            AI Models
          </NavLink>
          <NavLink to="/usage-history" className={({ isActive }) => 
            `text-base ${isActive ? 'text-light-blue font-medium' : 'text-gray-600 hover:text-navy'}`
          }>
            Usage History
          </NavLink>
          <Button className="ml-4 bg-light-blue hover:bg-navy transition-colors">
            <CreditCard className="mr-2 h-4 w-4" /> Add Credits
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `text-base p-2 rounded ${isActive ? 'bg-gray-100 text-light-blue font-medium' : 'text-gray-600'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/models" 
              className={({ isActive }) => 
                `text-base p-2 rounded ${isActive ? 'bg-gray-100 text-light-blue font-medium' : 'text-gray-600'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Models
            </NavLink>
            <NavLink 
              to="/usage-history" 
              className={({ isActive }) => 
                `text-base p-2 rounded ${isActive ? 'bg-gray-100 text-light-blue font-medium' : 'text-gray-600'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Usage History
            </NavLink>
            <Button className="w-full bg-light-blue hover:bg-navy transition-colors">
              <CreditCard className="mr-2 h-4 w-4" /> Add Credits
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
