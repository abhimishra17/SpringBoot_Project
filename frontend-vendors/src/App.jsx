import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

// Base URL proxied to http://127.0.0.1:8080/cloudvendor
const API_URL = '/cloudvendor';

export default function App() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    vendorName: '',
    vendorAge: '',
    vendorGender: 'Male',
    vendorCategory: '',
    vendorPhoneNo: '',
    vendorAddress: '',
  });

  // 1. Fetch all vendors on page load
  const loadVendors = async () => {
    try {
      const response = await axios.get(API_URL);
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      alert('Could not fetch vendors. Make sure Spring Boot is running on port 8080.');
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  // 2. Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Open form to Create new vendor
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      vendorName: '',
      vendorAge: '',
      vendorGender: 'Male',
      vendorCategory: '',
      vendorPhoneNo: '',
      vendorAddress: '',
    });
    setShowForm(true);
  };

  // 4. Open form to Edit existing vendor
  const handleOpenEdit = (vendor) => {
    setEditingId(vendor.vendorId);
    setFormData({
      vendorName: vendor.vendorName || '',
      vendorAge: vendor.vendorAge || '',
      vendorGender: vendor.vendorGender || 'Male',
      vendorCategory: vendor.vendorCategory || '',
      vendorPhoneNo: vendor.vendorPhoneNo || '',
      vendorAddress: vendor.vendorAddress || '',
    });
    setShowForm(true);
  };

  // 5. Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.vendorAge, 10) < 18) {
      alert('Vendor age must be at least 18 (backend validation requirement)');
      return;
    }

    try {
      if (editingId) {
        // UPDATE: PUT /cloudvendor/{id}
        const response = await axios.put(`${API_URL}/${editingId}`, formData);
        alert(response.data || 'Vendor updated successfully!');
      } else {
        // CREATE: POST /cloudvendor
        const response = await axios.post(API_URL, formData);
        alert(response.data || 'Vendor created successfully!');
      }

      setShowForm(false);
      setEditingId(null);
      loadVendors();
    } catch (error) {
      console.error('Error saving vendor:', error);
      alert('Failed to save vendor. Please check backend.');
    }
  };

  // 6. Delete vendor: DELETE /cloudvendor/{id}
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete vendor #${id}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      alert(response.data || 'Vendor deleted successfully!');
      loadVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
      alert('Failed to delete vendor.');
    }
  };

  // Filter vendors based on search term
  const filteredVendors = vendors.filter((vendor) => {
    const term = searchTerm.toLowerCase();
    return (
      (vendor.vendorName && vendor.vendorName.toLowerCase().includes(term)) ||
      (vendor.vendorCategory && vendor.vendorCategory.toLowerCase().includes(term)) ||
      (vendor.vendorPhoneNo && vendor.vendorPhoneNo.toLowerCase().includes(term)) ||
      (vendor.vendorAddress && vendor.vendorAddress.toLowerCase().includes(term))
    );
  });

  return (
    <div className="container">
      {/* HEADER with Search & Create Button */}
      <header className="header">
        <div>
          <h1>Cloud Vendor Portal</h1>
          <span className="subtitle">Running on Port 5173 • Spring Boot API Connected</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            + Create Vendor
          </button>
        </div>
      </header>

      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div className="form-card">
          <h2>{editingId ? `Edit Vendor #${editingId}` : 'Create New Cloud Vendor'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Vendor Name *</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  placeholder="e.g. Amazon Cloud Services"
                  required
                />
              </div>

              <div className="form-field">
                <label>Age (Min 18) *</label>
                <input
                  type="number"
                  name="vendorAge"
                  value={formData.vendorAge}
                  onChange={handleChange}
                  min="18"
                  placeholder="e.g. 25"
                  required
                />
              </div>

              <div className="form-field">
                <label>Gender *</label>
                <select name="vendorGender" value={formData.vendorGender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Category *</label>
                <input
                  type="text"
                  name="vendorCategory"
                  value={formData.vendorCategory}
                  onChange={handleChange}
                  placeholder="e.g. Cloud Storage, DevOps, DBaaS"
                  required
                />
              </div>

              <div className="form-field">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="vendorPhoneNo"
                  value={formData.vendorPhoneNo}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>

              <div className="form-field">
                <label>Address *</label>
                <input
                  type="text"
                  name="vendorAddress"
                  value={formData.vendorAddress}
                  onChange={handleChange}
                  placeholder="e.g. Delhi, India"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Vendor' : 'Save Vendor'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VENDORS TABLE */}
      <div className="table-card">
        <h2>All Cloud Vendors ({filteredVendors.length})</h2>

        {filteredVendors.length === 0 ? (
          <p className="no-data">
            {searchTerm ? `No vendors match "${searchTerm}"` : 'No vendors found. Click "+ Create Vendor" to add one!'}
          </p>
        ) : (
          <table className="vendor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.vendorId}>
                  <td>#{vendor.vendorId}</td>
                  <td className="bold">{vendor.vendorName}</td>
                  <td>{vendor.vendorAge} yrs</td>
                  <td>{vendor.vendorGender}</td>
                  <td>
                    <span className="badge">{vendor.vendorCategory}</span>
                  </td>
                  <td>{vendor.vendorPhoneNo}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleOpenEdit(vendor)}>
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(vendor.vendorId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
