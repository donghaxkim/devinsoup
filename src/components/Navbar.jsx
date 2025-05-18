import { useState, useEffect } from 'react';
import { Home, Instagram, Calendar } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-800/40 shadow-md backdrop-blur-lg py-2'
          : 'bg-black/20 backdrop-blur-md py-4'
      }`}
    >
      <div className="flex items-center w-full px-8">
        {/* Left - Home */}
        <div className="flex items-center gap-4 ml-20">
          <button
            onClick={handleHomeClick}
            className={`flex items-center font-display font-bold text-3xl transition-all duration-200 ${
              scrolled ? 'text-gray-100' : 'text-white'
            }`}
          >
            <Home size={36} />
          </button>
        </div>

        {/* Right - Nav links */}
        <div className="hidden mt-2 md:flex ml-auto mr-20 gap-x-10 items-center">
          {/* Group 1: Gallery and Contact */}
          <div className="flex gap-x-6 items-center">
            <NavLink to="/gallery" scrolled={scrolled} onClick={handleNavClick}>Gallery</NavLink>
            <NavLink href="#contact" scrolled={scrolled}>Contact</NavLink>
          </div>

          {/* Group 2: Book and Signup */}
          <div className="flex gap-x-6 items-center">
            <NavLink to="/book" scrolled={scrolled} onClick={handleNavClick}>Book</NavLink>
            {user ? (
              <button
                onClick={() => signOut(auth)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  border: '1px solid #e0e0e0',
                  marginLeft: '4px',
                  overflow: 'hidden',
                  padding: 0,
                  borderColor: '#e0e0e0',
                  cursor: 'pointer',
                }}
                title="Sign Out"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%' }} />
                ) : (
                  <FcGoogle size={22} />
                )}
              </button>
            ) : (
              <button
                onClick={async () => {
                  const provider = new GoogleAuthProvider();
                  try {
                    await signInWithPopup(auth, provider);
                  } catch (err) {
                    alert('Google sign-in failed');
                  }
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                  border: '1px solid #e0e0e0',
                  marginLeft: '4px',
                  cursor: 'pointer',
                  padding: 0,
                }}
                title="Sign in with Google"
              >
                <FcGoogle size={22} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <MobileMenuButton scrolled={scrolled} />
      </div>

      {/* Mobile menu */}
      <MobileMenu scrolled={scrolled} onClick={handleNavClick} user={user} />
    </nav>
  );
}

// NavLink component
function NavLink({ to, href, children, scrolled, onClick }) {
  // Special styling for the Book button
  if (children === 'Book') {
    return (
      <Link
        to={to}
        onClick={(e) => onClick && onClick(e, to)}
        className={`font-body font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-colors bg-white/90 hover:bg-blue-100 border border-blue-200 ${
          scrolled ? 'text-blue-700' : 'text-blue-800'
        } mt-[-2px]`}
        style={{ fontSize: '1.1rem', alignSelf: 'center' }}
      >
        <Calendar size={22} className="mr-1" />
        {children}
      </Link>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        onClick={(e) => onClick && onClick(e, to)}
        className={`font-body font-medium transition-colors ${
          scrolled
            ? 'text-gray-100 hover:text-blue-400'
            : 'text-white hover:text-blue-300'
        }`}
      >
        {children}
      </Link>
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
function MobileMenu({ scrolled, onClick, user }) {
  return (
    <div className="hidden md:hidden">
      <div className={`px-4 pt-2 pb-4 ${scrolled ? 'bg-gray-900/90' : 'bg-black/80 backdrop-blur-sm'}`}>

        {/* Group 1: Gallery and Contact */}
        <div className="mb-4">
          <Link 
            to="/gallery" 
            onClick={(e) => onClick && onClick(e, '/gallery')}
            className={`block mt-4 py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}
          >
            Gallery
          </Link>
          <a href="#contact" className={`block py-2 mt-4 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}>
            Contact
          </a>
        </div>

        {/* Group 2: Book and Signup */}
        <div>
          <Link 
            to="/book" 
            onClick={(e) => onClick && onClick(e, '/book')}
            className={`block py-2 px-4 font-body font-medium ${scrolled ? 'text-gray-100' : 'text-white'}`}
          >
            Book
          </Link>
          {user ? (
            <button
              onClick={() => signOut(auth)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                marginLeft: '4px',
                overflow: 'hidden',
                padding: 0,
                borderColor: '#e0e0e0',
                cursor: 'pointer',
              }}
              title="Sign Out"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%' }} />
              ) : (
                <FcGoogle size={22} />
              )}
            </button>
          ) : (
            <button
              onClick={async () => {
                const provider = new GoogleAuthProvider();
                try {
                  await signInWithPopup(auth, provider);
                } catch (err) {
                  alert('Google sign-in failed');
                }
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                marginLeft: '4px',
                cursor: 'pointer',
                padding: 0,
              }}
              title="Sign in with Google"
            >
              <FcGoogle size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
