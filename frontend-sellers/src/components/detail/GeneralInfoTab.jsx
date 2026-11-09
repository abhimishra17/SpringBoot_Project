import React from 'react';

export default function GeneralInfoTab({ seller }) {
  if (!seller) return null;

  return (
    <div className="table-card">
      <h2>General Firm & Owner Information</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Name of the Firm</span>
          <span className="info-value">{seller.sellerFirmName || 'N/A'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Owner / Contact Name</span>
          <span className="info-value">{seller.sellerName || 'N/A'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Contact Phone</span>
          <span className="info-value">📞 {seller.sellerPhoneNo || 'N/A'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Official Email</span>
          <span className="info-value">✉️ {seller.sellerEmail || 'N/A'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Entity / Business Type</span>
          <span className="info-value">{seller.businessType || 'Private Limited'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Seller Account ID</span>
          <span className="info-value">#{seller.sellerId}</span>
        </div>
        <div className="info-item" style={{ gridColumn: 'span 2' }}>
          <span className="info-label">Registered Office Address</span>
          <span className="info-value">📍 {seller.sellerAddress || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

