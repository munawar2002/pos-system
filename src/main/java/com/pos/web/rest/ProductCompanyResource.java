package com.pos.web.rest;

import com.pos.domain.ProductCompany;
import com.pos.repository.ProductCompanyRepository;
import com.pos.security.SecurityUtils;
import com.pos.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pos.domain.ProductCompany}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductCompanyResource {

    private final Logger log = LoggerFactory.getLogger(ProductCompanyResource.class);

    private static final String ENTITY_NAME = "productCompany";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductCompanyRepository productCompanyRepository;

    public ProductCompanyResource(ProductCompanyRepository productCompanyRepository) {
        this.productCompanyRepository = productCompanyRepository;
    }

    /**
     * {@code POST  /product-companies} : Create a new productCompany.
     *
     * @param productCompany the productCompany to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productCompany, or with status {@code 400 (Bad Request)} if the productCompany has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-companies")
    public ResponseEntity<ProductCompany> createProductCompany(@RequestBody ProductCompany productCompany) throws URISyntaxException {
        log.debug("REST request to save ProductCompany : {}", productCompany);
        if (productCompany.getId() != null) {
            throw new BadRequestAlertException("A new productCompany cannot already have an ID", ENTITY_NAME, "idexists");
        }
        productCompany.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        productCompany.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        ProductCompany result = productCompanyRepository.save(productCompany);
        return ResponseEntity.created(new URI("/api/product-companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-companies} : Updates an existing productCompany.
     *
     * @param productCompany the productCompany to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productCompany,
     * or with status {@code 400 (Bad Request)} if the productCompany is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productCompany couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-companies")
    public ResponseEntity<ProductCompany> updateProductCompany(@RequestBody ProductCompany productCompany) throws URISyntaxException {
        log.debug("REST request to update ProductCompany : {}", productCompany);
        if (productCompany.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        productCompany.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        productCompany.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        ProductCompany result = productCompanyRepository.save(productCompany);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productCompany.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-companies} : get all the productCompanies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productCompanies in body.
     */
    @GetMapping("/product-companies")
    public List<ProductCompany> getAllProductCompanies() {
        log.debug("REST request to get all ProductCompanies");
        return productCompanyRepository.findAll();
    }

    /**
     * {@code GET  /product-companies/:id} : get the "id" productCompany.
     *
     * @param id the id of the productCompany to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productCompany, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-companies/{id}")
    public ResponseEntity<ProductCompany> getProductCompany(@PathVariable Long id) {
        log.debug("REST request to get ProductCompany : {}", id);
        Optional<ProductCompany> productCompany = productCompanyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productCompany);
    }

    /**
     * {@code DELETE  /product-companies/:id} : delete the "id" productCompany.
     *
     * @param id the id of the productCompany to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-companies/{id}")
    public ResponseEntity<Void> deleteProductCompany(@PathVariable Long id) {
        log.debug("REST request to delete ProductCompany : {}", id);
        productCompanyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
