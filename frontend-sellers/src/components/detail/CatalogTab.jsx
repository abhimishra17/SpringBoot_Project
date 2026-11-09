import React from 'react';

export default function CatalogTab({ seller }) {
  if (!seller) return null;

  return (
    <div className="table-card">
      <h2>Product Catalog & Inventory Overview</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Total Listed SKUs</span>
          <span className="info-value">{seller.totalProducts || 135} Active Products</span>
        </div>
        <div className="info-item">
          <span className="info-label">Primary Categories</span>
          <span className="info-value">Consumer Goods, Accessories, Retail</span>
        </div>
        <div className="info-item">
          <span className="info-label">Stock Availability</span>
          <span className="info-value" style={{ color: '#059669' }}>96% In-Stock</span>
        </div>
        <div className="info-item">
          <span className="info-label">Average Order Value (AOV)</span>
          <span className="info-value">₹1,450</span>
        </div>
      </div>
    </div>
  );
}

