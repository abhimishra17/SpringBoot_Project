package com.abhimishra17.rest_demo.service;

import com.abhimishra17.rest_demo.model.EcommerceSeller;
import com.abhimishra17.rest_demo.model.SellerPlatform;
import com.abhimishra17.rest_demo.repository.EcommerceSellerRepository;
import com.abhimishra17.rest_demo.repository.SellerPlatformRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EcommerceSellerService {

    private final EcommerceSellerRepository sellerRepository;
    private final SellerPlatformRepository platformRepository;

    public EcommerceSellerService(EcommerceSellerRepository sellerRepository,
                                  SellerPlatformRepository platformRepository) {
        this.sellerRepository = sellerRepository;
        this.platformRepository = platformRepository;
    }

    public EcommerceSeller getSellerDetails(Long sellerId) {
        EcommerceSeller seller = sellerRepository.findById(sellerId).orElse(null);
        if (seller == null) {
            return null;
        }

        // Auto-seed sample compliance & platforms if seller is newly viewed and has no platforms
        if (seller.getPlatforms() == null || seller.getPlatforms().isEmpty()) {
            seedSamplePlatformsAndDetails(seller);
            seller = sellerRepository.save(seller);
        }

        return seller;
    }

    public String createSellerDetails(EcommerceSeller seller) {
        if (seller == null) {
            return "Seller details cannot be null";
        }
        sellerRepository.save(seller);
        return "seller details created sucessfully";
    }

    public String updateSellerDetails(Long sellerId, EcommerceSeller seller) {
        if (!sellerRepository.existsById(sellerId)) {
            return "seller not found";
        }
        seller.setSellerId(sellerId);
        sellerRepository.save(seller);
        return "seller details updated sucessfully";
    }

    public String deleteSellerDetails(Long sellerId) {
        if (!sellerRepository.existsById(sellerId)) {
            return "seller nott found";
        }
        sellerRepository.deleteById(sellerId);
        return "seller details deleted sucesfully";
    }

    public List<EcommerceSeller> getAllSellers() {
        return sellerRepository.findAll();
    }

    // Add platform to seller
    public String addPlatformToSeller(Long sellerId, SellerPlatform platform) {
        EcommerceSeller seller = sellerRepository.findById(sellerId).orElse(null);
        if (seller == null) {
            return "Seller not found";
        }
        seller.addPlatform(platform);
        sellerRepository.save(seller);
        return "Platform added successfully";
    }

    // Delete platform from seller
    public String deletePlatformFromSeller(Long sellerId, Long platformId) {
        if (!platformRepository.existsById(platformId)) {
            return "Platform not found";
        }
        platformRepository.deleteById(platformId);
        return "Platform deleted successfully";
    }

    private void seedSamplePlatformsAndDetails(EcommerceSeller seller) {
        String cleanFirm = (seller.getSellerFirmName() != null ? seller.getSellerFirmName() : "seller")
                .toLowerCase().replaceAll("[^a-z0-9]", "-");

        if (seller.getBusinessType() == null) seller.setBusinessType("Private Limited");
        if (seller.getGstin() == null) seller.setGstin("07AAACS" + seller.getSellerId() + "810Z" + (seller.getSellerId() % 9 + 1));
        if (seller.getPanNo() == null) seller.setPanNo("AABCS" + (1000 + seller.getSellerId()) + "F");
        if (seller.getBankAccountNo() == null) seller.setBankAccountNo("HDFC Bank •••• " + (4000 + seller.getSellerId() * 111));
        if (seller.getIfscCode() == null) seller.setIfscCode("HDFC0001234");
        if (seller.getTotalProducts() == null) seller.setTotalProducts(120 + (int)(seller.getSellerId() * 15));
        if (seller.getSellerRating() == null) seller.setSellerRating(4.5);

        seller.addPlatform(new SellerPlatform("Amazon India", "amazon.in/shops/" + cleanFirm, "Active", 4.6, "FBA (Fulfilled by Amazon)", 520));
        seller.addPlatform(new SellerPlatform("Flipkart", "flipkart.com/seller/" + cleanFirm, "Active", 4.4, "Flipkart Assured (FBF)", 410));
        seller.addPlatform(new SellerPlatform("Meesho", "meesho.com/supplier/" + seller.getSellerId(), "Active", 4.3, "Meesho Direct Ship", 280));
        seller.addPlatform(new SellerPlatform("Myntra", "myntra.com/brand/" + cleanFirm, "Under Review", null, "Drop-Ship / Omni-Channel", 0));
        seller.addPlatform(new SellerPlatform("Ajio", "ajio.com/seller/" + cleanFirm, "Pending", null, "Ajio B2B", 0));
        seller.addPlatform(new SellerPlatform("Own Website (Shopify)", "www." + cleanFirm.replace("-", "") + ".com", "Active", 4.8, "Shiprocket / Delhivery", 195));
    }


    public Long getTotalOrderForSeller(Long sellerId){
        return platformRepository.getTotalMonthlyOrdersBySellerId(sellerId);

    }
}
