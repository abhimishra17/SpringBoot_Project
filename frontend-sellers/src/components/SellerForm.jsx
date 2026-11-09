import React, { useState, useEffect } from 'react';

export default function SellerForm({ editingId, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerFirmName: '',
    sellerPhoneNo: '',
    sellerEmail: '',
    sellerAddress: '',
    sellerStatus: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        sellerName: initialData.sellerName || '',
        sellerFirmName: initialData.sellerFirmName || '',
        sellerPhoneNo: initialData.sellerPhoneNo || '',
        sellerEmail: initialData.sellerEmail || '',
        sellerAddress: initialData.sellerAddress || '',
        sellerStatus: initialData.sellerStatus !== undefined ? Boolean(initialData.sellerStatus) : true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Seller' : 'Save Seller'}
          </button>
        </div>
      </form>
    </div>
  );
}

