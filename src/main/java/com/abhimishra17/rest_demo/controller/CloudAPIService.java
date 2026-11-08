package com.abhimishra17.rest_demo.controller;

import com.abhimishra17.rest_demo.model.CloudVendor;
import com.abhimishra17.rest_demo.service.CloudVendorService;
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
@RequestMapping("/cloudvendor")
public class CloudAPIService {

    private final CloudVendorService cloudVendorService;

    public CloudAPIService(CloudVendorService cloudVendorService) {
        this.cloudVendorService = cloudVendorService;
    }

    @GetMapping("/{vendorId}")
    public CloudVendor getCloudVendorDetails(@PathVariable Long vendorId) {
        return cloudVendorService.getCloudVendorDetails(vendorId);
    }

    @GetMapping
    public List<CloudVendor> getAllCloudVendors() {
        return cloudVendorService.getAllCloudVendors();
    }

    @PostMapping
    public String createCloudVendorDetails(@RequestBody CloudVendor cloudVendor) {
        return cloudVendorService.createCloudVendorDetails(cloudVendor);
    }

    @PutMapping("/{vendorId}")
    public String updateCloudVendorDetails(@PathVariable Long vendorId,
                                          @RequestBody CloudVendor cloudVendor) {
        return cloudVendorService.updateCloudVendorDetails(vendorId, cloudVendor);
    }

    @DeleteMapping("/{vendorId}")
    public String deleteCloudVendorDetails(@PathVariable Long vendorId) {
        return cloudVendorService.deleteCloudVendorDetails(vendorId);
    }
}
