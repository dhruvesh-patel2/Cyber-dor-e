import React, { useState, useEffect } from 'react';
import './modalreparation.scss';

const ModalReparation = ({ isOpen, onClose, selectedDevice }) => {
  const [selectedRepair, setSelectedRepair] = useState(null);

  // Services de réparation disponibles
  const repairServices = [
    {
      id: 'ecran',
      title: 'Réparation Écran',
      description: 'Remplacement complet de l\'écran LCD/OLED',
      duration: '30 min',
      price: '82€',
      icon: '📱',
      features: ['Écran d\'origine', 'Garantie 6 mois', 'Test qualité']
    },
    {
      id: 'batterie',
      title: 'Changement Batterie',
      description: 'Remplacement batterie haute qualité',
      duration: '20 min', 
      price: '61€',
      icon: '🔋',
      features: ['Batterie certifiée', 'Garantie 1 an', 'Test de charge']
    },
    {
      id: 'connecteur',
      title: 'Connecteur de Charge',
      description: 'Réparation port de charge défaillant',
      duration: '25 min',
      price: '45€',
      icon: '🔌',
      features: ['Pièce d\'origine', 'Garantie 6 mois', 'Test complet']
    }
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSelectedRepair(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleServiceSelect = (service) => {
    setSelectedRepair(service);
  };

  const handleBooking = (location) => {
    if (selectedRepair) {
      console.log('Réservation:', {
        device: selectedDevice,
        service: selectedRepair,
        location: location
      });
      // Ici vous pouvez ouvrir la modal suivante selon le choix
      alert(`${location} pour ${selectedDevice?.title} - ${selectedRepair.title}`);
      onClose();
    }
  };

  const getDeviceImage = (device) => {
    if (!device) return 'https://images.unsplash.com/photo-1512499617640-c4b80f5d5c37?w=200&h=200&fit=crop&crop=center';
    
    const deviceName = device.title.toLowerCase();
    if (deviceName.includes('iphone')) {
      return 'https://images.unsplash.com/photo-1574755393849-623942496936?w=200&h=200&fit=crop&crop=center';
    } else if (deviceName.includes('samsung') || deviceName.includes('galaxy')) {
      return 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=200&h=200&fit=crop&crop=center';
    } else if (deviceName.includes('redmi') || deviceName.includes('xiaomi')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center';
    }
    return 'https://images.unsplash.com/photo-1512499617640-c4b80f5d5c37?w=200&h=200&fit=crop&crop=center';
  };

  if (!isOpen) return null;

  return (
    <div className="repair-modal-overlay" onClick={onClose}>
      <div className="repair-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header avec appareil sélectionné */}
        <div className="repair-modal-header">
          <div className="device-info-header">
            <div className="device-image-header">
              <img 
                src={getDeviceImage(selectedDevice)} 
                alt={selectedDevice?.alt || 'Appareil'} 
                className="device-image-small"
              />
            </div>
            <div className="device-details-header">
              <h2 className="device-name">{selectedDevice?.title || 'Appareil sélectionné'}</h2>
              <p className="device-brand-header">{selectedDevice?.brand}</p>
            </div>
          </div>
          
          <button className="repair-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Titre principal */}
        <div className="repair-modal-title-section">
          <h3 className="repair-main-title">Choisissez votre réparation</h3>
          <p className="repair-subtitle">Sélectionnez le service dont vous avez besoin</p>
        </div>

        {/* Services de réparation */}
        <div className="repair-services">
          {repairServices.map((service) => (
            <div 
              key={service.id}
              className={`repair-service-card ${selectedRepair?.id === service.id ? 'selected' : ''}`}
              onClick={() => handleServiceSelect(service)}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              
              <div className="service-content">
                <div className="service-header">
                  <h4 className="service-title">{service.title}</h4>
                  <div className="service-price">{service.price}</div>
                </div>
                
                <p className="service-description">{service.description}</p>
                
                <div className="service-duration">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Durée: {service.duration}</span>
                </div>

                <div className="service-features">
                  {service.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="service-selector">
                <div className={`radio-button ${selectedRepair?.id === service.id ? 'checked' : ''}`}>
                  {selectedRepair?.id === service.id && (
                    <div className="radio-inner"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer avec bouton de réservation */}
        <div className="repair-modal-footer">
          <div className="booking-summary">
            {selectedRepair && (
              <div className="selected-service-info">
                <span className="summary-text">
                  {selectedRepair.title} - {selectedRepair.price}
                </span>
                <span className="summary-duration">
                  Durée: {selectedRepair.duration}
                </span>
              </div>
            )}
          </div>
          
          <div className="booking-actions">
            <button 
              className={`btn-location ${!selectedRepair ? 'disabled' : ''}`}
              onClick={() => handleBooking('Réparation à domicile')}
              disabled={!selectedRepair}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Faire réparer mon téléphone à domicile
            </button>
            
            <button 
              className={`btn-location ${!selectedRepair ? 'disabled' : ''}`}
              onClick={() => handleBooking('Réparation en boutique')}
              disabled={!selectedRepair}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Faire réparer mon téléphone en boutique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReparation;