package com.abhimishra17.rest_demo.repository;

import com.abhimishra17.rest_demo.model.CloudVendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CloudVendorRepository extends JpaRepository<CloudVendor, Long> {
}
