import React, { useState, useEffect } from 'react';
import './Hero.scss';
import Modal from './Modalapareil/modal';

// Import des images
import banner1 from '../../assets/banner/banner1.jpg';
import banner2 from '../../assets/banner/banner2.jpg';
import banner3 from '../../assets/banner/banner3.jpg';
import tableteImage from '../../assets/tablete.jpg';
import samsungImage from '../../assets/samsung.jpg';
import iphoneImage from '../../assets/iphone.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const slides = [
    { id: 1, image: banner1, alt: 'Banner 1' },
    { id: 2, image: banner2, alt: 'Banner 2' },
    { id: 3, image: banner3, alt: 'Banner 3' }
  ];

  const devices = [
    { id: 'redmi', title: 'RÉPARATION REDMI', image: tableteImage, alt: 'Réparation iPad', brand: 'Redmi' },
    { id: 'samsung', title: 'RÉPARATION SAMSUNG', image: samsungImage, alt: 'Réparation Samsung', brand: 'Samsung' },
    { id: 'iphone', title: 'RÉPARATION IPHONE', image: iphoneImage, alt: 'Réparation iPhone', brand: 'iPhone' }
  ];

  // Auto-play du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToPrevious = () => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  const goToNext = () => setCurrentSlide((currentSlide + 1) % slides.length);

  // Gérer l'ouverture de la modal
  const handleDeviceClick = (deviceId, brandName) => {
    setSelectedBrand(brandName);
    setIsModalOpen(true);
  };

  // Fermer la modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <section className="hero">
        <div className="hero__container">
          {/* Section Carousel à gauche */}
          <div className="hero__left">
            <div className="hero__carousel">
              <div className="hero__slides">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
                  >
                    <img src={slide.image} alt={slide.alt} className="hero__slide-image" />
                    <div className="hero__slide-overlay"></div>
                  </div>
                ))}
              </div>

              {/* Flèches de navigation */}
              <button className="hero__arrow hero__arrow--left" onClick={goToPrevious} aria-label="Image précédente">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button className="hero__arrow hero__arrow--right" onClick={goToNext} aria-label="Image suivante">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Bullet points */}
              <div className="hero__bullets">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`hero__bullet ${index === currentSlide ? 'hero__bullet--active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Overlay avec contenu et boutons */}
              <div className="hero__content">
                <h1 className="hero__title">CYBER DORÉE</h1>
                <p className="hero__subtitle">Réparation professionnelle de vos appareils</p>
                
                <div className="hero__buttons">
                  <button className="hero__btn hero__btn--primary">PRENDRE RENDEZ-VOUS</button>
                  <button className="hero__btn hero__btn--secondary">FAIRE RÉPARER MON TÉLÉPHONE EN LIGNE</button>
                </div>
              </div>
            </div>
          </div>

          {/* Section Réalisations à droite */}
          <div className="hero__right">
            <h2 className="hero__realisation-title">RÉPARATION</h2>
            <div className="hero__devices">
              {devices.map((device) => (
                <div 
                  key={device.id} 
                  className="hero__device-card"
                  onClick={() => handleDeviceClick(device.id, device.brand)}
                >
                  <div className="hero__device-image-container">
                    <img src={device.image} alt={device.alt} className="hero__device-image" />
                    <div className="hero__device-overlay">
                      <h3 className="hero__device-title">{device.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal des appareils */}
      <Modal 
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedBrand={selectedBrand}
      />
    </>
  );
};

export default Hero;