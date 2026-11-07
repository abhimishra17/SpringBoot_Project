package com.abhimishra17.rest_demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cloud_vendor")
public class CloudVendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vendorId;

    private String vendorName;
    private int vendorAge;
    private String vendorGender;
    private String vendorCategory;
    private String vendorAddress;
    private String vendorPhoneNo;

    public CloudVendor() {
    }

    public CloudVendor(String vendorName, int vendorAge, String vendorGender,
                       String vendorCategory, String vendorAddress, String vendorPhoneNo) {
        this.vendorName = vendorName;
        this.vendorAge = vendorAge;
        this.vendorGender = vendorGender;
        this.vendorCategory = vendorCategory;
        this.vendorAddress = vendorAddress;
        this.vendorPhoneNo = vendorPhoneNo;
    }

    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getVendorAddress() {
        return vendorAddress;
    }

    public void setVendorAddress(String vendorAddress) {
        this.vendorAddress = vendorAddress;
    }

    public String getVendorPhoneNo() {
        return vendorPhoneNo;
    }

    public void setVendorPhoneNo(String vendorPhoneNo) {
        this.vendorPhoneNo = vendorPhoneNo;
    }

    public int getVendorAge() {
        return vendorAge;
    }

    public void setVendorAge(int vendorAge) {
        this.vendorAge = vendorAge;
    }

    public String getVendorCategory() {
        return vendorCategory;
    }

    public void setVendorCategory(String vendorCategory) {
        this.vendorCategory = vendorCategory;
    }

    public String getVendorGender() {
        return vendorGender;
    }

    public void setVendorGender(String vendorGender) {
        this.vendorGender = vendorGender;
    }
}
