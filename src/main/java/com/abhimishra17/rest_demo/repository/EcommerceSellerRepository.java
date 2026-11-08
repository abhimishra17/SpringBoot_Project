package com.abhimishra17.rest_demo.repository;

import com.abhimishra17.rest_demo.model.EcommerceSeller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EcommerceSellerRepository extends JpaRepository<EcommerceSeller, Long> {
    // JpaRepository gives you findAll(), save(), findById(), deleteById() out of the box!
}