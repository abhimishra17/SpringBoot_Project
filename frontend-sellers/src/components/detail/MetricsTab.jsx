import React from 'react';

export default function MetricsTab({ seller }) {
  if (!seller) return null;

  return (
    <div className="table-card">
      <h2>Operational Performance & Metrics</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Customer Rating</span>
          <span className="info-value">⭐ {seller.sellerRating || 4.5} / 5.0</span>
        </div>
        <div className="info-item">
          <span className="info-label">On-Time Dispatch Rate</span>
          <span className="info-value">98.8% (Target &gt; 95%)</span>
        </div>
        <div className="info-item">
          <span className="info-label">Customer Return / RTO Rate</span>
          <span className="info-value">5.4%</span>
        </div>
        <div className="info-item">
          <span className="info-label">Seller Account Health</span>
          <span className="info-value" style={{ color: '#059669' }}>Excellent (Green)</span>
        </div>
      </div>
    </div>
  );
}

