import { Mail, Phone } from 'lucide-react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ background: '#f5f5f5', color: '#333333' }} className="py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        {/* Left: Contact Info */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">Devin Soupanthong</h2>
          <div className="flex items-center gap-3 mb-2" style={{ color: '#555555' }}>
            <Mail size={28} />
            <span className="text-lg">devin.soup@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 mb-2" style={{ color: '#555555' }}>
            <Phone size={28} />
            <span className="text-lg">+1 (437)-226-2233</span>
          </div>
          <div className="flex items-center gap-4 mt-4 text-3xl" style={{ color: '#555555' }}>
            <a href="https://www.instagram.com/barber.dev1n/" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com/@devin.soup" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Center: Spacer for layout on desktop */}
        <div className="hidden md:block flex-1"></div>

        {/* Right: Webpage Links */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-4">Webpage</h2>
          <ul className="space-y-2 text-lg" style={{ color: '#555555' }}>
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="#gallery" className="hover:text-black">Gallery</a></li>
            <li><a href="#services" className="hover:text-black">Services</a></li>
            <li><a href="/book" className="hover:text-black">Book</a></li>
            <li><a href="#contact" className="hover:text-black">Contact</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-300 mt-12" />
    </footer>
  );
} 