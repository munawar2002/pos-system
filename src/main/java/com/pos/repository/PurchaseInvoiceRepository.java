package com.pos.repository;

import com.pos.domain.PurchaseInvoice;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PurchaseInvoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseInvoiceRepository extends JpaRepository<PurchaseInvoice, Long> {
}
