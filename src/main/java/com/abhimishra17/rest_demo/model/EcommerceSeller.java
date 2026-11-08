package com.abhimishra17.rest_demo.model;

import jakarta.persistence.*;

@Entity
@Table(name="ecommerce_seller")
public class EcommerceSeller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sellerId;
    private String sellerName;
    private String SellerFirmName;
    private String sellerAddress;
    private String sellerPhoneNo;
    private String sellerEmail;
    public boolean sellerStatus;

    public EcommerceSeller(){

    }
    public EcommerceSeller(String sellerName, String sellerFirmName, String sellerAddress,
            String sellerPhoneNo, String sellerEmail, boolean sellerStatus) {
        this.sellerName = sellerName;
        this.SellerFirmName = sellerFirmName;
        this.sellerAddress = sellerAddress;
        this.sellerPhoneNo = sellerPhoneNo;
        this.sellerEmail = sellerEmail;
        this.sellerStatus = sellerStatus;
    }

    public String getSellerFirmName() {
        return SellerFirmName;
    }

    public void setSellerFirmName(String sellerFirmName) {
        SellerFirmName = sellerFirmName;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
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

    public long getSellerId() {
        return sellerId;
    }

    public void setSellerId(long sellerId) {
        this.sellerId = sellerId;
    }
}
