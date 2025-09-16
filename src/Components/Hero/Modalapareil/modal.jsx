import React, { useState, useEffect } from 'react';
import { devices } from '../apareilinfo';
import ModalReparation from '../Modalreparation/modalreparation';
import './modal.scss';

const Modal = ({ isOpen, onClose, selectedBrand }) => {
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [selectedDeviceForRepair, setSelectedDeviceForRepair] = useState(null);

  // Liste des marques uniques
  const brands = ['all', ...new Set(devices.map(device => device.brand))];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Si une marque est sélectionnée lors de l'ouverture, l'appliquer comme filtre
      if (selectedBrand) {
        setActiveFilter(selectedBrand);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedBrand]);

  useEffect(() => {
    let filtered = devices;

    // Filtrer par marque
    if (activeFilter !== 'all') {
      filtered = filtered.filter(device => 
        device.brand.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(device =>
        device.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDevices(filtered);
  }, [activeFilter, searchTerm]);

  const handleFilterChange = (brand) => {
    setActiveFilter(brand);
    setSearchTerm(''); // Réinitialiser la recherche lors du changement de filtre
  };

  const handleDeviceSelect = (device) => {
    console.log('Appareil sélectionné:', device);
    setSelectedDeviceForRepair(device);
    setIsRepairModalOpen(true);
    // Ne pas fermer la modal des appareils tout de suite
  };

  const handleRepairModalClose = () => {
    setIsRepairModalOpen(false);
    setSelectedDeviceForRepair(null);
    // Fermer aussi la modal des appareils
    onClose();
  };

  // Fonction pour obtenir une image d'appareil réelle
  const getDeviceImage = (device) => {
    const deviceName = device.title.toLowerCase();
    
    // Images d'exemple pour différents appareils
    if (deviceName.includes('iphone')) {
      return 'https://images.unsplash.com/photo-1574755393849-623942496936?w=200&h=200&fit=crop&crop=center';
    } else if (deviceName.includes('samsung') || deviceName.includes('galaxy')) {
      return 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=200&h=200&fit=crop&crop=center';
    } else if (deviceName.includes('redmi') || deviceName.includes('xiaomi')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop&crop=center';
    }
    
    // Image par défaut
    return 'https://images.unsplash.com/photo-1512499617640-c4b80f5d5c37?w=200&h=200&fit=crop&crop=center';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header de la modal */}
        <div className="modal-header">
          <h2 className="modal-title">Choisissez votre appareil</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="modal-search">
          <input
            type="text"
            placeholder="Rechercher un modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Filtres par marque */}
        <div className="modal-filters">
          {brands.map((brand) => (
            <button
              key={brand}
              className={`filter-btn ${activeFilter === brand ? 'filter-btn--active' : ''}`}
              onClick={() => handleFilterChange(brand)}
            >
              {brand === 'all' ? 'Tous' : brand}
            </button>
          ))}
        </div>

        {/* Liste des appareils */}
        <div className="modal-devices">
          {filteredDevices.length > 0 ? (
            <div className="devices-grid">
              {filteredDevices.map((device, index) => (
                <div
                  key={`${device.id}-${index}`}
                  className="device-card"
                  onClick={() => handleDeviceSelect(device)}
                >
                  <div className="device-image-container">
                    <img
                      src={getDeviceImage(device)}
                      alt={device.alt}
                      className="device-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1512499617640-c4b80f5d5c37?w=200&h=200&fit=crop&crop=center';
                      }}
                    />
                  </div>
                  <div className="device-info">
                    <h3 className="device-title">{device.title}</h3>
                    <p className="device-brand">{device.brand}</p>
                    <div className="device-services">
                      <span className="service-item">🔧 Écran</span>
                      <span className="service-item">🔋 Batterie</span>
                      <span className="service-item">📱 Réparation</span>
                    </div>
                    <div className="device-price-info">
                      <span className="price-label">À partir de</span>
                      <span className="price-value">29€</span>
                    </div>
                  </div>
                  <div className="device-action">
                    <span>Choisir</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-devices">
              <div className="no-devices-icon">📱</div>
              <h3>Aucun appareil trouvé</h3>
              <p>Essayez de modifier votre recherche ou sélectionnez une autre marque</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de réparation */}
      <ModalReparation 
        isOpen={isRepairModalOpen}
        onClose={handleRepairModalClose}
        selectedDevice={selectedDeviceForRepair}
      />
    </div>
  );
};

export default Modal;