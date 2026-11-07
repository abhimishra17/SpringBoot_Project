package com.abhimishra17.rest_demo.service;

import com.abhimishra17.rest_demo.model.CloudVendor;
import com.abhimishra17.rest_demo.repository.CloudVendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CloudVendorService {

    private final CloudVendorRepository cloudVendorRepository;

    public CloudVendorService(CloudVendorRepository cloudVendorRepository) {
        this.cloudVendorRepository = cloudVendorRepository;
    }

    public CloudVendor getCloudVendorDetails(Long vendorId) {
        return cloudVendorRepository.findById(vendorId).orElse(null);
    }

    public String createCloudVendorDetails(CloudVendor cloudVendor) {
        if (cloudVendor == null) {
            return "Vendor details cannot be null";
        }
        if (isEmpty(cloudVendor.getVendorName())
                || isEmpty(cloudVendor.getVendorGender())
                || isEmpty(cloudVendor.getVendorCategory())
                || isEmpty(cloudVendor.getVendorAddress())
                || isEmpty(cloudVendor.getVendorPhoneNo())) {
            return "All fields are mandatory. Fields cannot be empty";
        }
        if (cloudVendor.getVendorAge() < 18) {
            return "Vendor age must be at least 18";
        }

        cloudVendorRepository.save(cloudVendor);
        return "Cloud Vendor Created Successfully";
    }

    public String updateCloudVendorDetails(Long vendorId, CloudVendor cloudVendor) {
        if (!cloudVendorRepository.existsById(vendorId)) {
            return "Cloud Vendor Not Found";
        }
        cloudVendor.setVendorId(vendorId);
        cloudVendorRepository.save(cloudVendor);
        return "Cloud Vendor Updated Successfully";
    }

    public String deleteCloudVendorDetails(Long vendorId) {
        if (!cloudVendorRepository.existsById(vendorId)) {
            return "Cloud Vendor Not Found";
        }
        cloudVendorRepository.deleteById(vendorId);
        return "Cloud Vendor Deleted Successfully";
    }

    public List<CloudVendor> getAllCloudVendors() {
        return cloudVendorRepository.findAll();
    }

    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
