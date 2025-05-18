import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Gallery({ isPreview = false }) {
  const [loadedImages, setLoadedImages] = useState({});

  const images = [
    '/gallery/IMG_4146.JPG',
    '/gallery/IMG_4147.JPG',
    '/gallery/IMG_4148.JPG',
    '/gallery/IMG_4149.JPG',
    '/gallery/IMG_4150.JPG',
    '/gallery/IMG_4151.JPG',
    '/gallery/IMG_4152.JPG',
    '/gallery/IMG_4153.JPG',
    '/gallery/IMG_4154.JPG',
  ];

  const displayImages = isPreview ? images.slice(0, 4) : images;

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const cols = isPreview ? 4 : 3;
  const gapPx = 16;

  return (
    <div
      className="w-full"
      style={{
        paddingLeft: `${gapPx}px`,
        paddingRight: `${gapPx}px`,
        paddingTop: '2px',
      }}
    >
      {!isPreview && (
        <h2
          className="text-4xl font-semibold mb-8 text-gray-800 text-center"
          style={{ paddingTop: '80px' }}
        >
          Our Work
        </h2>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, calc((100% - ${(cols - 1) * gapPx}px) / ${cols}))`,
          columnGap: `${gapPx}px`,
          rowGap: `${gapPx}px`,
        }}
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg aspect-square"
            style={{ cursor: 'pointer' }}
          >
            {!loadedImages[index] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 rounded-lg hover:scale-105 ${
                loadedImages[index] ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(index)}
              onError={(e) => {
                console.error(`Error loading image ${image}:`, e);
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
          </div>
        ))}
      </div>

      {isPreview && (
        <div className="text-center mt-6">
          <Link
            to="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View More
          </Link>
        </div>
      )}
    </div>
  );
}
