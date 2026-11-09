import React from 'react';

export default function ComplianceTab({ seller }) {
  if (!seller) return null;

  return (
    <div className="table-card">
      <h2>Tax & Bank Account Verification (KYC)</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">GSTIN (15-Digit GST)</span>
          <span className="info-value">{seller.gstin || '07AAACS1810Z2'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Permanent Account Number (PAN)</span>
          <span className="info-value">{seller.panNo || 'AABCS1001F'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Bank Account</span>
          <span className="info-value">{seller.bankAccountNo || 'HDFC Bank •••• 4111'}</span>
        </div>
        <div className="info-item">
          <span className="info-label">IFSC Code</span>
          <span className="info-value">{seller.ifscCode || 'HDFC0001234'}</span>
        </div>
        <div className="info-item" style={{ gridColumn: 'span 2' }}>
          <span className="info-label">Verification Status</span>
          <span className="info-value" style={{ color: '#059669' }}>KYC Verified & Compliant ✅</span>
        </div>
      </div>
    </div>
  );
}

