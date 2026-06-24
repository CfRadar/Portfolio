import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScreenshotCarouselProps {
  images: string[];
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Main Large Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 border border-[#1e293b] rounded overflow-hidden bg-[#03050c] group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-gray-400 font-mono text-xs bg-[#03050c]/80 px-3 py-1.5 backdrop-blur-md rounded border border-[#1e293b]">
          <span>{currentIndex + 1} / {images.length}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentIndex((p) => (p - 1 + images.length) % images.length)}
              className="hover:text-white transition-colors"
            >&lt;</button>
            <button 
              onClick={() => setCurrentIndex((p) => (p + 1) % images.length)}
              className="hover:text-white transition-colors"
            >&gt;</button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="hidden lg:grid grid-cols-3 gap-4 h-20 shrink-0">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative border overflow-hidden rounded transition-all duration-300 ${
              currentIndex === idx ? 'border-[#00C8FF]' : 'border-[#1e293b] opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            {currentIndex !== idx && (
              <div className="absolute inset-0 bg-[#03050c]/50 mix-blend-overlay"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotCarousel;
