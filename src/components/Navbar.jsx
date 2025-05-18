import { useState, useEffect } from 'react';
import { Home, Instagram, Calendar } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-800/40 shadow-md backdrop-blur-lg py-2'
          : 'bg-black/20 backdrop-blur-md py-4'
      }`}
    >
      <div className="flex items-center w-full px-8">
        {/* Left - Home + Social links */}
        <div className="flex items-center gap-4 ml-20">
          <a
            href="/"
            className={`flex items-center font-display font-bold text-3xl transition-all duration-200 ${
              scrolled ? 'text-gray-100' : 'text-white'
            }`}
          >
            <Home size={36} />
          </a>
          <a
            href="https://www.instagram.com/barber.dev1n/"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl ${
              scrolled ? 'text-gray-100 hover:text-pink-400' : 'text-white hover:text-pink-300'
            }`}
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@devin.soup"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl ${
              scrolled ? 'text-gray-100 hover:text-green-400' : 'text-white hover:text-green-300'
            }`}
          >
            <FaTiktok size={20} />
          </a>
        </div>

        {/* Right - Nav links */}
        <div className="hidden mt-2 md:flex ml-auto gap-x-6">
          <NavLink href="#gallery" scrolled={scrolled}>Gallery</NavLink>
          <NavLink href="#services" scrolled={scrolled}>Services</NavLink>
          <NavLink href="#contact" scrolled={scrolled}>Contact</NavLink>
        </div>


        <div className="hidden md:flex ml-auto mr-20 gap-x-6">
          <NavLink href="book" scrolled={scrolled}>Book</NavLink>
        </div>

        {/* Mobile menu button */}
        <MobileMenuButton scrolled={scrolled} />
      </div>

      {/* Mobile menu */}
      <MobileMenu scrolled={scrolled} />
    </nav>
  );
}

// NavLink component
function NavLink({ href, children, scrolled }) {
  // Special styling for the Book button
  if (children === 'Book') {
    return (
      <a
        href={href}
        className={`font-body font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-colors bg-white/90 hover:bg-blue-100 border border-blue-200 ${
          scrolled ? 'text-blue-700' : 'text-blue-800'
        } mt-[-2px]`}
        style={{ fontSize: '1.1rem', alignSelf: 'center' }}
      >
        <Calendar size={22} className="mr-1" />
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`font-body font-medium transition-colors ${
        scrolled
          ? 'text-gray-100 hover:text-blue-400'
          : 'text-white hover:text-blue-300'
      }`}
    >
      {children}
    </a>
  );
}

// Mobile menu button
function MobileMenuButton({ scrolled }) {
  return (
    <button
      className={`md:hidden ml-4 p-2 rounded-md ${
        scrolled ? 'text-gray-200' : 'text-white'
      }`}
    >
      <div className="w-6 flex flex-col gap-1">
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
        <span className={`block h-0.5 w-full ${scrolled ? 'bg-gray-200' : 'bg-white'}`}></span>
      </div>
    </button>
  );
}

// Mobile menu content
function MobileMenu({ scrolled }) {
  return (
    <div className="hidden md:hidden">
      <div className={`px-4 pt-2 pb-4 ${scrolled ? 'bg-gray-900/90' : 'bg-black/80 backdrop-blur-sm'}`}>
        <a href="#gallery" className={`block py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Gallery</a>
        <a href="#contact" className={`block py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Contact</a>
        <a href="#services" className={`block py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Services</a>
        <a href="#book" className={`block py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>Book</a>
      </div>
    </div>
  );
}
