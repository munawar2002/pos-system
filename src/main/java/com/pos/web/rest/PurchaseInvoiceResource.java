package com.pos.web.rest;

import com.pos.domain.PurchaseInvoice;
import com.pos.repository.PurchaseInvoiceRepository;
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
 * REST controller for managing {@link com.pos.domain.PurchaseInvoice}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PurchaseInvoiceResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseInvoiceResource.class);

    private static final String ENTITY_NAME = "purchaseInvoice";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurchaseInvoiceRepository purchaseInvoiceRepository;

    public PurchaseInvoiceResource(PurchaseInvoiceRepository purchaseInvoiceRepository) {
        this.purchaseInvoiceRepository = purchaseInvoiceRepository;
    }

    /**
     * {@code POST  /purchase-invoices} : Create a new purchaseInvoice.
     *
     * @param purchaseInvoice the purchaseInvoice to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purchaseInvoice, or with status {@code 400 (Bad Request)} if the purchaseInvoice has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purchase-invoices")
    public ResponseEntity<PurchaseInvoice> createPurchaseInvoice(@RequestBody PurchaseInvoice purchaseInvoice) throws URISyntaxException {
        log.debug("REST request to save PurchaseInvoice : {}", purchaseInvoice);
        if (purchaseInvoice.getId() != null) {
            throw new BadRequestAlertException("A new purchaseInvoice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PurchaseInvoice result = purchaseInvoiceRepository.save(purchaseInvoice);
        return ResponseEntity.created(new URI("/api/purchase-invoices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purchase-invoices} : Updates an existing purchaseInvoice.
     *
     * @param purchaseInvoice the purchaseInvoice to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purchaseInvoice,
     * or with status {@code 400 (Bad Request)} if the purchaseInvoice is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purchaseInvoice couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purchase-invoices")
    public ResponseEntity<PurchaseInvoice> updatePurchaseInvoice(@RequestBody PurchaseInvoice purchaseInvoice) throws URISyntaxException {
        log.debug("REST request to update PurchaseInvoice : {}", purchaseInvoice);
        if (purchaseInvoice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PurchaseInvoice result = purchaseInvoiceRepository.save(purchaseInvoice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purchaseInvoice.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purchase-invoices} : get all the purchaseInvoices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purchaseInvoices in body.
     */
    @GetMapping("/purchase-invoices")
    public List<PurchaseInvoice> getAllPurchaseInvoices() {
        log.debug("REST request to get all PurchaseInvoices");
        return purchaseInvoiceRepository.findAll();
    }

    /**
     * {@code GET  /purchase-invoices/:id} : get the "id" purchaseInvoice.
     *
     * @param id the id of the purchaseInvoice to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purchaseInvoice, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purchase-invoices/{id}")
    public ResponseEntity<PurchaseInvoice> getPurchaseInvoice(@PathVariable Long id) {
        log.debug("REST request to get PurchaseInvoice : {}", id);
        Optional<PurchaseInvoice> purchaseInvoice = purchaseInvoiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purchaseInvoice);
    }

    /**
     * {@code DELETE  /purchase-invoices/:id} : delete the "id" purchaseInvoice.
     *
     * @param id the id of the purchaseInvoice to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purchase-invoices/{id}")
    public ResponseEntity<Void> deletePurchaseInvoice(@PathVariable Long id) {
        log.debug("REST request to delete PurchaseInvoice : {}", id);
        purchaseInvoiceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
