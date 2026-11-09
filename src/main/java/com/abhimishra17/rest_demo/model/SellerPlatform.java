package com.abhimishra17.rest_demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "seller_platform")
public class SellerPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long platformId;

    private String platformName;     // Amazon, Flipkart, Meesho, Myntra, Ajio, Own Website
    private String storeUrl;         // e.g. amazon.in/shops/sharma-electronics
    private String status;           // Active, Inactive, Under Review
    private Double storeRating;      // e.g. 4.6
    private String fulfillmentType;  // FBA, Self-Ship, FBF, Direct Ship
    private Integer monthlyOrders;   // e.g. 450

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    @JsonBackReference
    private EcommerceSeller seller;

    public SellerPlatform() {
    }

    public SellerPlatform(String platformName, String storeUrl, String status, Double storeRating, String fulfillmentType, Integer monthlyOrders) {
        this.platformName = platformName;
        this.storeUrl = storeUrl;
        this.status = status;
        this.storeRating = storeRating;
        this.fulfillmentType = fulfillmentType;
        this.monthlyOrders = monthlyOrders;
    }

    public Long getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Long platformId) {
        this.platformId = platformId;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getStoreUrl() {
        return storeUrl;
    }

    public void setStoreUrl(String storeUrl) {
        this.storeUrl = storeUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getStoreRating() {
        return storeRating;
    }

    public void setStoreRating(Double storeRating) {
        this.storeRating = storeRating;
    }

    public String getFulfillmentType() {
        return fulfillmentType;
    }

    public void setFulfillmentType(String fulfillmentType) {
        this.fulfillmentType = fulfillmentType;
    }

    public Integer getMonthlyOrders() {
        return monthlyOrders;
    }

    public void setMonthlyOrders(Integer monthlyOrders) {
        this.monthlyOrders = monthlyOrders;
    }

    public EcommerceSeller getSeller() {
        return seller;
    }

    public void setSeller(EcommerceSeller seller) {
        this.seller = seller;
    }
}

