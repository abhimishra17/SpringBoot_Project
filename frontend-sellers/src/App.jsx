import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

// Base URL proxied to http://127.0.0.1:8080/ecommerce-seller
const API_URL = '/ecommerce-seller';

export default function App() {
  const [sellers, setSellers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    sellerName: '',
    sellerFirmName: '',
    sellerPhoneNo: '',
    sellerEmail: '',
    sellerAddress: '',
    sellerStatus: true,
  });

  // 1. Fetch all sellers on page load
  const loadSellers = async () => {
    try {
      const response = await axios.get(API_URL);
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
      alert('Could not fetch sellers. Make sure Spring Boot is running on port 8080.');
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  // 2. Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. Open form to Create new seller
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      sellerName: '',
      sellerFirmName: '',
      sellerPhoneNo: '',
      sellerEmail: '',
      sellerAddress: '',
      sellerStatus: true,
    });
    setShowForm(true);
  };

  // 4. Open form to Edit existing seller
  const handleOpenEdit = (seller) => {
    setEditingId(seller.sellerId);
    setFormData({
      sellerName: seller.sellerName || '',
      sellerFirmName: seller.sellerFirmName || '',
      sellerPhoneNo: seller.sellerPhoneNo || '',
      sellerEmail: seller.sellerEmail || '',
      sellerAddress: seller.sellerAddress || '',
      sellerStatus: Boolean(seller.sellerStatus),
    });
    setShowForm(true);
  };

  // 5. Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE: PUT /ecommerce-seller/{id}
        const response = await axios.put(`${API_URL}/${editingId}`, formData);
        alert(response.data || 'Seller updated successfully!');
      } else {
        // CREATE: POST /ecommerce-seller
        const response = await axios.post(API_URL, formData);
        alert(response.data || 'Seller created successfully!');
      }

      setShowForm(false);
      setEditingId(null);
      loadSellers();
    } catch (error) {
      console.error('Error saving seller:', error);
      alert('Failed to save seller. Please check backend.');
    }
  };

  // 6. Delete seller: DELETE /ecommerce-seller/{id}
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete seller #${id}?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      alert(response.data || 'Seller deleted successfully!');
      loadSellers();
    } catch (error) {
      console.error('Error deleting seller:', error);
      alert('Failed to delete seller.');
    }
  };

  // Filter sellers based on search term
  const filteredSellers = sellers.filter((seller) => {
    const term = searchTerm.toLowerCase();
    return (
      (seller.sellerName && seller.sellerName.toLowerCase().includes(term)) ||
      (seller.sellerFirmName && seller.sellerFirmName.toLowerCase().includes(term)) ||
      (seller.sellerEmail && seller.sellerEmail.toLowerCase().includes(term)) ||
      (seller.sellerPhoneNo && seller.sellerPhoneNo.toLowerCase().includes(term)) ||
      (seller.sellerAddress && seller.sellerAddress.toLowerCase().includes(term))
    );
  });

  return (
    <div className="container">
      {/* HEADER with Search & Create Button */}
      <header className="header">
        <div>
          <h1>E-commerce Seller Portal</h1>
          <span className="subtitle">Running on Port 5174 • Spring Boot API Connected</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            + Create Seller
          </button>
        </div>
      </header>

      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div className="form-card">
          <h2>{editingId ? `Edit Seller #${editingId}` : 'Register New E-commerce Seller'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Seller Contact Name *</label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div className="form-field">
                <label>Firm / Store Name *</label>
                <input
                  type="text"
                  name="sellerFirmName"
                  value={formData.sellerFirmName}
                  onChange={handleChange}
                  placeholder="e.g. Sharma Electronics"
                  required
                />
              </div>

              <div className="form-field">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="sellerPhoneNo"
                  value={formData.sellerPhoneNo}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Business Email *</label>
                <input
                  type="email"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleChange}
                  placeholder="e.g. rahul@sharmaelectronics.com"
                  required
                />
              </div>

              <div className="form-field" style={{ flex: 2 }}>
                <label>Registered Office Address *</label>
                <input
                  type="text"
                  name="sellerAddress"
                  value={formData.sellerAddress}
                  onChange={handleChange}
                  placeholder="e.g. Delhi, India"
                  required
                />
              </div>

              <div className="form-field" style={{ justifyContent: 'center' }}>
                <label>Account Status</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '6px' }}>
                  <input
                    type="checkbox"
                    name="sellerStatus"
                    checked={formData.sellerStatus}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: 600, color: formData.sellerStatus ? '#059669' : '#dc2626' }}>
                    {formData.sellerStatus ? 'Active Seller' : 'Inactive'}
                  </span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Seller' : 'Save Seller'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SELLERS TABLE */}
      <div className="table-card">
        <h2>All E-commerce Sellers ({filteredSellers.length})</h2>

        {filteredSellers.length === 0 ? (
          <p className="no-data">
            {searchTerm ? `No sellers match "${searchTerm}"` : 'No sellers found. Click "+ Create Seller" to add one!'}
          </p>
        ) : (
          <table className="vendor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Seller Name</th>
                <th>Firm / Store</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.sellerId}>
                  <td>#{seller.sellerId}</td>
                  <td className="bold">{seller.sellerName}</td>
                  <td>{seller.sellerFirmName}</td>
                  <td>{seller.sellerPhoneNo}</td>
                  <td>{seller.sellerEmail}</td>
                  <td>{seller.sellerAddress}</td>
                  <td>
                    <span className={seller.sellerStatus ? 'badge' : 'badge-inactive'}>
                      {seller.sellerStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleOpenEdit(seller)}>
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(seller.sellerId)}>
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
