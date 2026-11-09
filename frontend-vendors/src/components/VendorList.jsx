import React, { useState } from 'react';

export default function VendorList({ vendors, onOpenCreate, onOpenEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter vendors based on search term
  const filteredVendors = vendors.filter((vendor) => {
    const term = searchTerm.toLowerCase();
    return (
      (vendor.vendorName && vendor.vendorName.toLowerCase().includes(term)) ||
      (vendor.vendorCategory && vendor.vendorCategory.toLowerCase().includes(term)) ||
      (vendor.vendorPhoneNo && vendor.vendorPhoneNo.toLowerCase().includes(term)) ||
      (vendor.vendorAddress && vendor.vendorAddress.toLowerCase().includes(term))
    );
  });

  return (
    <>
      {/* Header Toolbar */}
      <header className="header">
        <div>
          <h1>Cloud Vendor Portal</h1>
          <span className="subtitle">Running on Port 5173 • Spring Boot API Connected</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={onOpenCreate}>
            + Create Vendor
          </button>
        </div>
      </header>

      {/* Vendors Table Card */}
      <div className="table-card">
        <h2>All Cloud Vendors ({filteredVendors.length})</h2>

        {filteredVendors.length === 0 ? (
          <p className="no-data">
            {searchTerm ? `No vendors match "${searchTerm}"` : 'No vendors found. Click "+ Create Vendor" to add one!'}
          </p>
        ) : (
          <table className="vendor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Category</th>
                <th>Phone</th>
                <th>Address</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.vendorId}>
                  <td>#{vendor.vendorId}</td>
                  <td className="bold">{vendor.vendorName}</td>
                  <td>{vendor.vendorAge} yrs</td>
                  <td>{vendor.vendorGender}</td>
                  <td>
                    <span className="badge">{vendor.vendorCategory}</span>
                  </td>
                  <td>{vendor.vendorPhoneNo}</td>
                  <td>{vendor.vendorAddress}</td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button className="btn btn-edit" onClick={() => onOpenEdit(vendor)}>
                      Edit
                    </button>
                    <button className="btn btn-delete" onClick={() => onDelete(vendor.vendorId)}>
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

