package com.abhimishra17.rest_demo.controller;

import com.abhimishra17.rest_demo.model.EcommerceSeller;
import com.abhimishra17.rest_demo.service.EcommerceSellerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/ecommerce-seller")
public class EcommerceSellerController {
    private final EcommerceSellerService ecommerceSellerService;

    public EcommerceSellerController(EcommerceSellerService ecommerceSellerService){
        this.ecommerceSellerService=ecommerceSellerService;
    }

    @GetMapping("/{sellerId}")
    public EcommerceSeller getSellerDetails(@PathVariable Long sellerId){
        return ecommerceSellerService.getSellerDetails(sellerId);
    }

    @GetMapping
    public List<EcommerceSeller>getallsellersdetails(){
        return ecommerceSellerService.getAllSellers();
    }

    @PostMapping
    public String createSellerDetails(@RequestBody EcommerceSeller seller){
        return ecommerceSellerService.createSellerDetails(seller);
    }

    @PutMapping("/{sellerId}")
    public String updateSellerDetails(@PathVariable Long sellerId,@RequestBody EcommerceSeller seller){
        return ecommerceSellerService.updateSellerDetails(sellerId,seller);

    }
    @DeleteMapping("/{sellerId}")
    public String deleteSellerDetails(@PathVariable Long sellerId){
        return ecommerceSellerService.deleteSellerDetails(sellerId);
    }



}
