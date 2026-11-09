package com.abhimishra17.rest_demo.controller;

import com.abhimishra17.rest_demo.model.EcommerceSeller;
import com.abhimishra17.rest_demo.model.SellerPlatform;
import com.abhimishra17.rest_demo.service.EcommerceSellerService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ecommerce-seller")
public class EcommerceSellerController {

    private final EcommerceSellerService ecommerceSellerService;

    public EcommerceSellerController(EcommerceSellerService ecommerceSellerService) {
        this.ecommerceSellerService = ecommerceSellerService;
    }

    @GetMapping("/{sellerId}")
    public EcommerceSeller getSellerDetails(@PathVariable Long sellerId) {
        return ecommerceSellerService.getSellerDetails(sellerId);
    }

    @GetMapping
    public List<EcommerceSeller> getallsellersdetails() {
        return ecommerceSellerService.getAllSellers();
    }

    @PostMapping
    public String createSellerDetails(@RequestBody EcommerceSeller seller) {
        return ecommerceSellerService.createSellerDetails(seller);
    }

    @PutMapping("/{sellerId}")
    public String updateSellerDetails(@PathVariable Long sellerId, @RequestBody EcommerceSeller seller) {
        return ecommerceSellerService.updateSellerDetails(sellerId, seller);
    }


    @DeleteMapping("/{sellerId}")
    public String deleteSellerDetails(@PathVariable Long sellerId) {
        return ecommerceSellerService.deleteSellerDetails(sellerId);
    }

    // Add a selling platform to a specific seller
    @PostMapping("/{sellerId}/platforms")
    public String addPlatformToSeller(@PathVariable Long sellerId, @RequestBody SellerPlatform platform) {
        return ecommerceSellerService.addPlatformToSeller(sellerId, platform);
    }

    // Remove a selling platform from a specific seller
    @DeleteMapping("/{sellerId}/platforms/{platformId}")
    public String deletePlatformFromSeller(@PathVariable Long sellerId, @PathVariable Long platformId) {
        return ecommerceSellerService.deletePlatformFromSeller(sellerId, platformId);
    }
}
