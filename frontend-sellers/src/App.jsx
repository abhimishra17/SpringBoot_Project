import React, { useState, useEffect } from 'react';
import { sellerService } from './api/sellerService';
import SellerList from './components/SellerList';
import SellerForm from './components/SellerForm';
import SellerDetail from './components/detail/SellerDetail';
import './index.css';

export default function App() {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState(null);

  // 1. Fetch all sellers on load
  const loadSellers = async () => {
    try {
      const data = await sellerService.getAllSellers();
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
      alert('Could not fetch sellers. Make sure Spring Boot is running on port 8080.');
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  // 2. View specific seller details (GET /ecommerce-seller/{id})
  const handleViewDetails = async (sellerId) => {
    try {
      const data = await sellerService.getSellerById(sellerId);
      setSelectedSeller(data);
    } catch (error) {
      console.error('Error loading seller details:', error);
      alert('Failed to load seller details.');
    }
  };

  // 3. Save seller (Create or Update)
  const handleSaveSeller = async (formData) => {
    try {
      if (editingSeller) {
        await sellerService.updateSeller(editingSeller.sellerId, formData);
        alert('Seller updated successfully!');
      } else {
        await sellerService.createSeller(formData);
        alert('Seller created successfully!');
      }
      setShowForm(false);
      setEditingSeller(null);
      loadSellers();
    } catch (error) {
      console.error('Error saving seller:', error);
      alert('Failed to save seller.');
    }
  };

  // 4. Delete seller
  const handleDeleteSeller = async (id) => {
    if (!window.confirm(`Are you sure you want to delete seller #${id}?`)) return;
    try {
      await sellerService.deleteSeller(id);
      alert('Seller deleted successfully!');
      if (selectedSeller && selectedSeller.sellerId === id) {
        setSelectedSeller(null);
      }
      loadSellers();
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert('Failed to delete seller.');
    }
  };

  // 5. Add platform to currently viewed seller
  const handleAddPlatform = async (platformData) => {
    if (!selectedSeller) return;
    try {
      await sellerService.addPlatform(selectedSeller.sellerId, platformData);
      alert('Platform added successfully!');
      handleViewDetails(selectedSeller.sellerId);
    } catch (error) {
      console.error('Error adding platform:', error);
      alert('Failed to add platform.');
    }
  };

  // 6. Delete platform from currently viewed seller
  const handleDeletePlatform = async (platformId) => {
    if (!selectedSeller || !window.confirm('Remove this platform integration?')) return;
    try {
      await sellerService.deletePlatform(selectedSeller.sellerId, platformId);
      handleViewDetails(selectedSeller.sellerId);
    } catch (error) {
      console.error('Error deleting platform:', error);
      alert('Failed to delete platform.');
    }
  };

  return (
    <div className="container">
      {selectedSeller ? (
        /* DETAIL PAGE VIEW */
        <SellerDetail
          seller={selectedSeller}
          onBack={() => {
            setSelectedSeller(null);
            loadSellers();
          }}
          onEdit={(seller) => {
            setEditingSeller(seller);
            setShowForm(true);
            setSelectedSeller(null);
          }}
          onAddPlatform={handleAddPlatform}
          onDeletePlatform={handleDeletePlatform}
        />
      ) : (
        /* MAIN LIST VIEW */
        <>
          {showForm && (
            <SellerForm
              editingId={editingSeller ? editingSeller.sellerId : null}
              initialData={editingSeller}
              onSubmit={handleSaveSeller}
              onCancel={() => {
                setShowForm(false);
                setEditingSeller(null);
              }}
            />
          )}

          <SellerList
            sellers={sellers}
            onOpenCreate={() => {
              setEditingSeller(null);
              setShowForm(true);
            }}
            onOpenEdit={(seller) => {
              setEditingSeller(seller);
              setShowForm(true);
            }}
            onViewDetails={handleViewDetails}
            onDelete={handleDeleteSeller}
          />
        </>
      )}
    </div>
  );
}
