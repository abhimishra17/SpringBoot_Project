import React, { useState, useEffect } from 'react';
import { vendorService } from './api/vendorService';
import VendorList from './components/VendorList';
import VendorForm from './components/VendorForm';
import './index.css';

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  // 1. Fetch vendors on page load
  const loadVendors = async () => {
    try {
      const data = await vendorService.getAllVendors();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      alert('Could not fetch vendors. Make sure Spring Boot is running on port 8080.');
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // 2. Save vendor (Create or Update)
  const handleSaveVendor = async (formData) => {
    try {
      if (editingVendor) {
        await vendorService.updateVendor(editingVendor.vendorId, formData);
        alert('Vendor updated successfully!');
      } else {
        await vendorService.createVendor(formData);
        alert('Vendor created successfully!');
      }
      setShowForm(false);
      setEditingVendor(null);
      loadVendors();
    } catch (error) {
      console.error('Error saving vendor:', error);
      alert('Failed to save vendor. Please check backend.');
    }
  };

  // 3. Delete vendor
  const handleDeleteVendor = async (id) => {
    if (!window.confirm(`Are you sure you want to delete vendor #${id}?`)) return;
    try {
      await vendorService.deleteVendor(id);
      alert('Vendor deleted successfully!');
      loadVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
      alert('Failed to delete vendor.');
    }
  };

  return (
    <div className="container">
      {showForm && (
        <VendorForm
          editingId={editingVendor ? editingVendor.vendorId : null}
          initialData={editingVendor}
          onSubmit={handleSaveVendor}
          onCancel={() => {
            setShowForm(false);
            setEditingVendor(null);
          }}
        />
      )}

      <VendorList
        vendors={vendors}
        onOpenCreate={() => {
          setEditingVendor(null);
          setShowForm(true);
        }}
        onOpenEdit={(vendor) => {
          setEditingVendor(vendor);
          setShowForm(true);
        }}
        onDelete={handleDeleteVendor}
      />
    </div>
  );
}
