package com.abhimishra17.rest_demo.service;

import com.abhimishra17.rest_demo.model.EcommerceSeller;
import com.abhimishra17.rest_demo.repository.EcommerceSellerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EcommerceSellerService {
    private final EcommerceSellerRepository sellerRepository;

    public EcommerceSellerService(EcommerceSellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public EcommerceSeller getSellerDetails(Long sellerId){
        return sellerRepository.findById(sellerId).orElse(null);
    }

    public String createSellerDetails(EcommerceSeller seller){
        if(seller==null){
            return "Seller details cannot be null";
        }
        sellerRepository.save(seller);

        return "seller details created sucessfully";
    }

    public String updateSellerDetails(Long sellerId,EcommerceSeller seller){
        if(!sellerRepository.existsById(sellerId)){
            return "seller not found";
        }
        seller.setSellerId(sellerId);
        sellerRepository.save(seller);
        return "seller details updated sucessfully";
    }

    public String deleteSellerDetails(Long sellerId){
        if(!sellerRepository.existsById(sellerId)){
            return "seller nott found";
        }
        sellerRepository.deleteById(sellerId);
        return "seller details deleted sucesfully";
    }

    public List<EcommerceSeller> getAllSellers(){
        return sellerRepository.findAll();
    }



}
