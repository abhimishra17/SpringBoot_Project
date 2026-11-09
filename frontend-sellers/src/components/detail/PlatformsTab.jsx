import React, { useState } from 'react';

export default function PlatformsTab({ seller, onAddPlatform, onDeletePlatform }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [platformForm, setPlatformForm] = useState({
    platformName: 'Amazon India',
    storeUrl: '',
    status: 'Active',
    storeRating: '4.5',
    fulfillmentType: 'FBA (Fulfilled by Amazon)',
    monthlyOrders: '100',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlatform({
      platformName: platformForm.platformName,
      storeUrl: platformForm.storeUrl,
      status: platformForm.status,
      storeRating: parseFloat(platformForm.storeRating) || null,
      fulfillmentType: platformForm.fulfillmentType,
      monthlyOrders: parseInt(platformForm.monthlyOrders, 10) || 0,
    });
    setShowAddForm(false);
    setPlatformForm({
      platformName: 'Amazon India',
      storeUrl: '',
      status: 'Active',
      storeRating: '4.5',
      fulfillmentType: 'FBA (Fulfilled by Amazon)',
      monthlyOrders: '100',
    });
  };

  const platforms = seller?.platforms || [];

  return (
    <div className="table-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Active Marketplace Channels</h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Where {seller.sellerFirmName} lists and sells products online
          </span>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form' : '+ Add Platform'}
        </button>
      </div>

      {/* Add Platform Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '12px', color: '#065f46' }}>Connect New Marketplace</h3>
          <div className="form-row">
            <div className="form-field">
              <label>Platform Name *</label>
              <select
                value={platformForm.platformName}
                onChange={(e) => setPlatformForm({ ...platformForm, platformName: e.target.value })}
              >
                <option value="Amazon India">Amazon India</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Meesho">Meesho</option>
                <option value="Myntra">Myntra</option>
                <option value="Ajio">Ajio</option>
                <option value="Own Website (Shopify)">Own Website (Shopify)</option>
                <option value="Nykaa">Nykaa</option>
                <option value="Tata CLiQ">Tata CLiQ</option>
              </select>
            </div>

            <div className="form-field">
              <label>Store URL / Handle *</label>
              <input
                type="text"
                placeholder="e.g. amazon.in/shops/my-store"
                value={platformForm.storeUrl}
                onChange={(e) => setPlatformForm({ ...platformForm, storeUrl: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label>Fulfillment Model</label>
              <select
                value={platformForm.fulfillmentType}
                onChange={(e) => setPlatformForm({ ...platformForm, fulfillmentType: e.target.value })}
              >
                <option value="FBA (Fulfilled by Amazon)">FBA (Fulfilled by Amazon)</option>
                <option value="Flipkart Assured (FBF)">Flipkart Assured (FBF)</option>
                <option value="Self-Ship / Courier">Self-Ship / Courier</option>
                <option value="Meesho Direct Ship">Meesho Direct Ship</option>
                <option value="Drop-Ship / Omni">Drop-Ship / Omni</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Status</label>
              <select
                value={platformForm.status}
                onChange={(e) => setPlatformForm({ ...platformForm, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-field">
              <label>Store Rating (out of 5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                placeholder="4.5"
                value={platformForm.storeRating}
                onChange={(e) => setPlatformForm({ ...platformForm, storeRating: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Avg Monthly Orders</label>
              <input
                type="number"
                placeholder="250"
                value={platformForm.monthlyOrders}
                onChange={(e) => setPlatformForm({ ...platformForm, monthlyOrders: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Platform
            </button>
          </div>
        </form>
      )}

      {/* Platforms Table */}
      {platforms.length === 0 ? (
        <p className="no-data">No platforms integrated yet. Click "+ Add Platform" to connect one!</p>
      ) : (
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Store URL / Handle</th>
              <th>Status</th>
              <th>Store Rating</th>
              <th>Fulfillment</th>
              <th>Orders / Month</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((plat) => (
              <tr key={plat.platformId}>
                <td className="bold">{plat.platformName}</td>
                <td style={{ color: '#0369a1', fontFamily: 'monospace', fontSize: '13px' }}>
                  {plat.storeUrl}
                </td>
                <td>
                  <span className={plat.status === 'Active' ? 'badge' : 'badge-inactive'}>
                    {plat.status}
                  </span>
                </td>
                <td>{plat.storeRating ? `⭐ ${plat.storeRating} / 5.0` : '—'}</td>
                <td>{plat.fulfillmentType || 'Standard'}</td>
                <td><strong>{plat.monthlyOrders || 0}</strong> orders</td>
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDeletePlatform(plat.platformId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

