package com.pos.repository;

import com.pos.domain.PurchaseOrderBreakdown;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PurchaseOrderBreakdown entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseOrderBreakdownRepository extends JpaRepository<PurchaseOrderBreakdown, Long> {
}
