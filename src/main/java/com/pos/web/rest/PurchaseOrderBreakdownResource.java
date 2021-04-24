package com.pos.web.rest;

import com.pos.domain.PurchaseOrderBreakdown;
import com.pos.repository.PurchaseOrderBreakdownRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pos.domain.PurchaseOrderBreakdown}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PurchaseOrderBreakdownResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseOrderBreakdownResource.class);

    private static final String ENTITY_NAME = "purchaseOrderBreakdown";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchaseOrderBreakdownRepository purchaseOrderBreakdownRepository;

    public PurchaseOrderBreakdownResource(PurchaseOrderBreakdownRepository purchaseOrderBreakdownRepository) {
        this.purchaseOrderBreakdownRepository = purchaseOrderBreakdownRepository;
    }

    /**
     * {@code POST  /purchase-order-breakdowns} : Create a new purchaseOrderBreakdown.
     *
     * @param purchaseOrderBreakdown the purchaseOrderBreakdown to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchaseOrderBreakdown, or with status {@code 400 (Bad Request)} if the purchaseOrderBreakdown has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchase-order-breakdowns")
    public ResponseEntity<PurchaseOrderBreakdown> createPurchaseOrderBreakdown(@RequestBody PurchaseOrderBreakdown purchaseOrderBreakdown) throws URISyntaxException {
        log.debug("REST request to save PurchaseOrderBreakdown : {}", purchaseOrderBreakdown);
        if (purchaseOrderBreakdown.getId() != null) {
            throw new BadRequestAlertException("A new purchaseOrderBreakdown cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseOrderBreakdown result = purchaseOrderBreakdownRepository.save(purchaseOrderBreakdown);
        return ResponseEntity.created(new URI("/api/purchase-order-breakdowns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchase-order-breakdowns} : Updates an existing purchaseOrderBreakdown.
     *
     * @param purchaseOrderBreakdown the purchaseOrderBreakdown to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchaseOrderBreakdown,
     * or with status {@code 400 (Bad Request)} if the purchaseOrderBreakdown is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchaseOrderBreakdown couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchase-order-breakdowns")
    public ResponseEntity<PurchaseOrderBreakdown> updatePurchaseOrderBreakdown(@RequestBody PurchaseOrderBreakdown purchaseOrderBreakdown) throws URISyntaxException {
        log.debug("REST request to update PurchaseOrderBreakdown : {}", purchaseOrderBreakdown);
        if (purchaseOrderBreakdown.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseOrderBreakdown result = purchaseOrderBreakdownRepository.save(purchaseOrderBreakdown);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchaseOrderBreakdown.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchase-order-breakdowns} : get all the purchaseOrderBreakdowns.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchaseOrderBreakdowns in body.
     */
    @GetMapping("/purchase-order-breakdowns")
    public List<PurchaseOrderBreakdown> getAllPurchaseOrderBreakdowns() {
        log.debug("REST request to get all PurchaseOrderBreakdowns");
        return purchaseOrderBreakdownRepository.findAll();
    }

    /**
     * {@code GET  /purchase-order-breakdowns/:id} : get the "id" purchaseOrderBreakdown.
     *
     * @param id the id of the purchaseOrderBreakdown to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchaseOrderBreakdown, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchase-order-breakdowns/{id}")
    public ResponseEntity<PurchaseOrderBreakdown> getPurchaseOrderBreakdown(@PathVariable Long id) {
        log.debug("REST request to get PurchaseOrderBreakdown : {}", id);
        Optional<PurchaseOrderBreakdown> purchaseOrderBreakdown = purchaseOrderBreakdownRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchaseOrderBreakdown);
    }

    /**
     * {@code DELETE  /purchase-order-breakdowns/:id} : delete the "id" purchaseOrderBreakdown.
     *
     * @param id the id of the purchaseOrderBreakdown to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchase-order-breakdowns/{id}")
    public ResponseEntity<Void> deletePurchaseOrderBreakdown(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseOrderBreakdown : {}", id);
        purchaseOrderBreakdownRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
