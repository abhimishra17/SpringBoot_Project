import React, { useState, useEffect } from 'react';

export default function VendorForm({ editingId, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorAge: '',
    vendorGender: 'Male',
    vendorCategory: '',
    vendorPhoneNo: '',
    vendorAddress: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        vendorName: initialData.vendorName || '',
        vendorAge: initialData.vendorAge || '',
        vendorGender: initialData.vendorGender || 'Male',
        vendorCategory: initialData.vendorCategory || '',
        vendorPhoneNo: initialData.vendorPhoneNo || '',
        vendorAddress: initialData.vendorAddress || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.vendorAge, 10) < 18) {
      alert('Vendor age must be at least 18 (backend validation requirement)');
      return;
    }
    onSubmit(formData);
  };

  return (
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
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Vendor' : 'Save Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
}

