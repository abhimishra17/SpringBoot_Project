import React, { useState } from 'react';

export default function SellerList({
  sellers,
  onOpenCreate,
  onOpenEdit,
  onViewDetails,
  onDelete,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter sellers based on search and status
  const filteredSellers = sellers.filter((seller) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (seller.sellerName && seller.sellerName.toLowerCase().includes(term)) ||
      (seller.sellerFirmName && seller.sellerFirmName.toLowerCase().includes(term)) ||
      (seller.sellerEmail && seller.sellerEmail.toLowerCase().includes(term)) ||
      (seller.sellerPhoneNo && seller.sellerPhoneNo.toLowerCase().includes(term)) ||
      (seller.sellerAddress && seller.sellerAddress.toLowerCase().includes(term));

    let matchesStatus = true;
    if (statusFilter === 'ACTIVE') {
      matchesStatus = seller.sellerStatus === true;
    } else if (statusFilter === 'INACTIVE') {
      matchesStatus = seller.sellerStatus === false;
    }

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      {/* Header Toolbar */}
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
          <select
            className="search-input"
            style={{ minWidth: '130px', cursor: 'pointer' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <button className="btn btn-primary" onClick={onOpenCreate}>
            + Create Seller
          </button>
        </div>
      </header>

      {/* Sellers Data Table */}
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
                <th>Firm / Store</th>
                <th>Owner Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr key={seller.sellerId}>
                  <td>#{seller.sellerId}</td>
                  <td>
                    <span
                      className="bold"
                      style={{ color: '#047857', cursor: 'pointer', textDecoration: 'underline' }}
                      title="Click to view full seller details"
                      onClick={() => onViewDetails(seller.sellerId)}
                    >
                      {seller.sellerFirmName}
                    </span>
                  </td>
                  <td>{seller.sellerName}</td>
                  <td>{seller.sellerPhoneNo}</td>
                  <td>{seller.sellerEmail}</td>
                  <td>{seller.sellerAddress}</td>
                  <td>
                    <span className={seller.sellerStatus ? 'badge' : 'badge-inactive'}>
                      {seller.sellerStatus ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: '6px', padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => onViewDetails(seller.sellerId)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => onOpenEdit(seller)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(seller.sellerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

