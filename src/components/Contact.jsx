import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import LeafletMap from './LeafletMap';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Contact</h2>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Barber Image */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl h-[900px]">
              <img 
                src="/ss1.png" 
                alt="Devin Soup - Master Barber" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Devin Soup</h3>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              I've been cutting hair since December 2024, with hands-on experience in tapers, fades, and scissor work. Whether it's a clean fade or a detailed scissor cut, I focus on precision and making sure every client leaves with a fresh, confident look. I'm always learning and improving my craft to deliver the best results.
            </p>

            {/* Location Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-gray-800 dark:text-white" size={20} />
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Location</h4>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
                <LeafletMap />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Located at Yonge Street & 19th Avenue (Exact location will be provided after booking)
              </p>
            </div>
            
            <div className="space-y-6">
              <a href="mailto:barber.devv@gmail.com" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <Mail size={22} className="text-black dark:text-white" />
                </div>
                <span className="text-lg">barber.devv@gmail.com</span>
              </a>
              <a href="tel:+14165551234" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <Phone size={22} className="text-black dark:text-white" />
                </div>
                <span className="text-lg">(647) 570-9649</span>
              </a>
              <a href="https://www.instagram.com/barber.dev1n/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <FaInstagram size={22} />
                </div>
                <span className="text-lg">@barber.dev1n</span>
              </a>
              <a href="https://tiktok.com/@devin.soup" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-black dark:text-white hover:opacity-80 transition-opacity">
                <div className="bg-gray-200 dark:bg-gray-800 p-3 rounded-full">
                  <FaTiktok size={22} />
                </div>
                <span className="text-lg">@devin.soup</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}