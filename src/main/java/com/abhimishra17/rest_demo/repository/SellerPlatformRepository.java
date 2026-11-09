package com.abhimishra17.rest_demo.repository;

import com.abhimishra17.rest_demo.model.SellerPlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerPlatformRepository extends JpaRepository<SellerPlatform, Long> {
    List<SellerPlatform> findBySeller_SellerId(Long sellerId);
}

