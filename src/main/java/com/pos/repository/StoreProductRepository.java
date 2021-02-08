package com.pos.repository;

import com.pos.domain.StoreProduct;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the StoreProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoreProductRepository extends JpaRepository<StoreProduct, Long> {
}
