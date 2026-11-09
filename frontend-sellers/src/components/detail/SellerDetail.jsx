import React, { useState } from 'react';
import GeneralInfoTab from './GeneralInfoTab';
import PlatformsTab from './PlatformsTab';
import CatalogTab from './CatalogTab';
import ComplianceTab from './ComplianceTab';
import MetricsTab from './MetricsTab';

export default function SellerDetail({ seller, onBack, onEdit, onAddPlatform, onDeletePlatform }) {
  const [activeTab, setActiveTab] = useState('general');

  if (!seller) return null;

  return (
    <div className="detail-page">
      {/* Header Bar */}
      <div className="detail-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to All Sellers
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#065f46' }}>
            {seller.sellerFirmName}
          </h1>
          <span className={seller.sellerStatus ? 'badge' : 'badge-inactive'}>
            {seller.sellerStatus ? 'Active Seller' : 'Inactive'}
          </span>
        </div>
        <button className="btn btn-edit" onClick={() => onEdit(seller)}>
          Edit Seller
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-bar">
        <button
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          📋 General Info
        </button>
        <button
          className={`tab-btn ${activeTab === 'platforms' ? 'active' : ''}`}
          onClick={() => setActiveTab('platforms')}
        >
          🌐 Selling Platforms ({seller.platforms ? seller.platforms.length : 0})
        </button>
        <button
          className={`tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          📦 Catalog & Stock
        </button>
        <button
          className={`tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          🏦 Tax & Banking (KYC)
        </button>
        <button
          className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          📊 Performance Metrics
        </button>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'general' && <GeneralInfoTab seller={seller} />}
      {activeTab === 'platforms' && (
        <PlatformsTab
          seller={seller}
          onAddPlatform={onAddPlatform}
          onDeletePlatform={onDeletePlatform}
        />
      )}
      {activeTab === 'catalog' && <CatalogTab seller={seller} />}
      {activeTab === 'compliance' && <ComplianceTab seller={seller} />}
      {activeTab === 'metrics' && <MetricsTab seller={seller} />}
    </div>
  );
}

