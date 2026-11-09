import React, { useState } from 'react';
import { sellerService } from '../../api/sellerService';

export default function PlatformsTab({ seller, onAddPlatform, onDeletePlatform }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [totalOrders, setTotalOrders] = useState(null);
  const [showTotalModal, setShowTotalModal] = useState(false);
  const [loadingTotal, setLoadingTotal] = useState(false);
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

  const calTotalOrder = async () => {
    try {
      setLoadingTotal(true);
      const total = await sellerService.getTotalOrders(seller.sellerId);
      setTotalOrders(total ?? 0);
      setShowTotalModal(true);
    } catch (err) {
      console.error('Failed to calculate total orders:', err);
      alert('Failed to calculate total orders. Please make sure the backend is running.');
    } finally {
      setLoadingTotal(false);
    }
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
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={calTotalOrder}
            disabled={loadingTotal}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {loadingTotal ? '⏳ Calculating...' : '📊 Calculate Total Orders'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Close Form' : '+ Add Platform'}
          </button>
        </div>
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
      {/* Total Orders Popup Fragment / Modal */}
      {showTotalModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          onClick={() => setShowTotalModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 16px'
            }}>
              📦
            </div>

            <h3 style={{ margin: '0 0 6px 0', fontSize: '20px', color: '#0f172a' }}>
              Total Monthly Orders
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>
              Combined volume across all channels for <strong>{seller.sellerFirmName}</strong>
            </p>

            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              border: '2px dashed #86efac',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '44px', fontWeight: '800', color: '#15803d', lineHeight: 1 }}>
                {Number(totalOrders).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#166534', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Orders / Month
              </div>
            </div>

            <div style={{
              fontSize: '12px',
              color: '#64748b',
              marginBottom: '20px',
              background: '#f8fafc',
              padding: '10px',
              borderRadius: '8px'
            }}>
              Calculated across <strong>{platforms.length}</strong> integrated channel{platforms.length === 1 ? '' : 's'} via Spring Boot.
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px 0', fontSize: '14px', borderRadius: '8px' }}
              onClick={() => setShowTotalModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

