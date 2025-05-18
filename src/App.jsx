import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
