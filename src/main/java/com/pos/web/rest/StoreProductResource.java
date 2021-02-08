package com.pos.web.rest;

import com.pos.service.StoreProductService;
import com.pos.web.rest.errors.BadRequestAlertException;
import com.pos.service.dto.StoreProductDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pos.domain.StoreProduct}.
 */
@RestController
@RequestMapping("/api")
public class StoreProductResource {

    private final Logger log = LoggerFactory.getLogger(StoreProductResource.class);

    private static final String ENTITY_NAME = "storeProduct";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoreProductService storeProductService;

    public StoreProductResource(StoreProductService storeProductService) {
        this.storeProductService = storeProductService;
    }

    /**
     * {@code POST  /store-products} : Create a new storeProduct.
     *
     * @param storeProductDTO the storeProductDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new storeProductDTO, or with status {@code 400 (Bad Request)} if the storeProduct has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/store-products")
    public ResponseEntity<StoreProductDTO> createStoreProduct(@RequestBody StoreProductDTO storeProductDTO) throws URISyntaxException {
        log.debug("REST request to save StoreProduct : {}", storeProductDTO);
        if (storeProductDTO.getId() != null) {
            throw new BadRequestAlertException("A new storeProduct cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoreProductDTO result = storeProductService.save(storeProductDTO);
        return ResponseEntity.created(new URI("/api/store-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /store-products} : Updates an existing storeProduct.
     *
     * @param storeProductDTO the storeProductDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated storeProductDTO,
     * or with status {@code 400 (Bad Request)} if the storeProductDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the storeProductDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/store-products")
    public ResponseEntity<StoreProductDTO> updateStoreProduct(@RequestBody StoreProductDTO storeProductDTO) throws URISyntaxException {
        log.debug("REST request to update StoreProduct : {}", storeProductDTO);
        if (storeProductDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StoreProductDTO result = storeProductService.save(storeProductDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, storeProductDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /store-products} : get all the storeProducts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of storeProducts in body.
     */
    @GetMapping("/store-products")
    public List<StoreProductDTO> getAllStoreProducts() {
        log.debug("REST request to get all StoreProducts");
        return storeProductService.findAll();
    }

    /**
     * {@code GET  /store-products/:id} : get the "id" storeProduct.
     *
     * @param id the id of the storeProductDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the storeProductDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/store-products/{id}")
    public ResponseEntity<StoreProductDTO> getStoreProduct(@PathVariable Long id) {
        log.debug("REST request to get StoreProduct : {}", id);
        Optional<StoreProductDTO> storeProductDTO = storeProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(storeProductDTO);
    }

    /**
     * {@code DELETE  /store-products/:id} : delete the "id" storeProduct.
     *
     * @param id the id of the storeProductDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/store-products/{id}")
    public ResponseEntity<Void> deleteStoreProduct(@PathVariable Long id) {
        log.debug("REST request to delete StoreProduct : {}", id);
        storeProductService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
