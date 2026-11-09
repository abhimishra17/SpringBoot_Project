package com.abhimishra17.rest_demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ecommerce_seller")
public class EcommerceSeller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellerId;

    private String sellerName;
    private String sellerFirmName;
    private String sellerAddress;
    private String sellerPhoneNo;
    private String sellerEmail;
    private boolean sellerStatus = true;

    // Business & Compliance Details
    private String businessType;      // e.g. "Private Limited", "Partnership", "Sole Proprietor"
    private String gstin;             // 15-digit GST Number
    private String panNo;             // PAN Number
    private String bankAccountNo;     // Masked or full bank account
    private String ifscCode;          // IFSC Code
    private Integer totalProducts;    // Total active SKU count
    private Double sellerRating;      // Rating e.g. 4.6

    // One-to-Many Relational Mapping with Platforms
    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    private List<SellerPlatform> platforms = new ArrayList<>();

    public EcommerceSeller() {
    }

    public EcommerceSeller(String sellerName, String sellerFirmName, String sellerAddress,
                           String sellerPhoneNo, String sellerEmail, boolean sellerStatus) {
        this.sellerName = sellerName;
        this.sellerFirmName = sellerFirmName;
        this.sellerAddress = sellerAddress;
        this.sellerPhoneNo = sellerPhoneNo;
        this.sellerEmail = sellerEmail;
        this.sellerStatus = sellerStatus;
    }

    // Helper methods for bidirectional relationship
    public void addPlatform(SellerPlatform platform) {
        if (platform != null) {
            platforms.add(platform);
            platform.setSeller(this);
        }
    }

    public void removePlatform(SellerPlatform platform) {
        if (platform != null) {
            platforms.remove(platform);
            platform.setSeller(null);
        }
    }

    // Getters and Setters
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getSellerFirmName() {
        return sellerFirmName;
    }

    public void setSellerFirmName(String sellerFirmName) {
        this.sellerFirmName = sellerFirmName;
    }

    public String getSellerAddress() {
        return sellerAddress;
    }

    public void setSellerAddress(String sellerAddress) {
        this.sellerAddress = sellerAddress;
    }

    public String getSellerPhoneNo() {
        return sellerPhoneNo;
    }

    public void setSellerPhoneNo(String sellerPhoneNo) {
        this.sellerPhoneNo = sellerPhoneNo;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public boolean isSellerStatus() {
        return sellerStatus;
    }

    public void setSellerStatus(boolean sellerStatus) {
        this.sellerStatus = sellerStatus;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    public String getPanNo() {
        return panNo;
    }

    public void setPanNo(String panNo) {
        this.panNo = panNo;
    }

    public String getBankAccountNo() {
        return bankAccountNo;
    }

    public void setBankAccountNo(String bankAccountNo) {
        this.bankAccountNo = bankAccountNo;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public Integer getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(Integer totalProducts) {
        this.totalProducts = totalProducts;
    }

    public Double getSellerRating() {
        return sellerRating;
    }

    public void setSellerRating(Double sellerRating) {
        this.sellerRating = sellerRating;
    }

    public List<SellerPlatform> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<SellerPlatform> platforms) {
        this.platforms = platforms;
        if (platforms != null) {
            for (SellerPlatform platform : platforms) {
                platform.setSeller(this);
            }
        }
    }
}
