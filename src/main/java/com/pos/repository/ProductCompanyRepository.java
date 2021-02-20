package com.pos.repository;

import com.pos.domain.ProductCompany;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProductCompany entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductCompanyRepository extends JpaRepository<ProductCompany, Long> {
}
