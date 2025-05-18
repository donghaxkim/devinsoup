import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './components/Book';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Signup from './Signup';
import Login from './Login';
import Signout from './components/Signout';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
