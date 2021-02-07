package com.pos.web.rest;

import com.pos.domain.Store;
import com.pos.domain.dto.StoreDto;
import com.pos.repository.StoreRepository;
import com.pos.service.StoreService;
import com.pos.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.pos.domain.Store}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StoreResource {

    private final Logger log = LoggerFactory.getLogger(StoreResource.class);

    private static final String ENTITY_NAME = "store";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StoreRepository storeRepository;

    @Autowired
    private StoreService storeService;

    public StoreResource(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    /**
     * {@code POST  /stores} : Create a new storeDto.
     *
     * @param storeDto the storeDto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new storeDto, or with status {@code 400 (Bad Request)} if the storeDto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stores")
    public ResponseEntity<Store> createStore(@Valid @RequestBody StoreDto storeDto) throws URISyntaxException {
        log.debug("REST request to save Store : {}", storeDto);
        if (storeDto.getId() != null) {
            throw new BadRequestAlertException("A new storeDto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Store result = storeService.saveStore(storeDto);
        return ResponseEntity.created(new URI("/api/stores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stores} : Updates an existing storeDto.
     *
     * @param storeDto the storeDto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated storeDto,
     * or with status {@code 400 (Bad Request)} if the storeDto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the storeDto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stores")
    public ResponseEntity<Store> updateStore(@Valid @RequestBody StoreDto storeDto) throws URISyntaxException {
        log.debug("REST request to update Store : {}", storeDto);
        if (storeDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Store result = storeService.saveStore(storeDto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, storeDto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /stores} : get all the stores.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stores in body.
     */
    @GetMapping("/stores")
    public List<Store> getAllStores() {
        log.debug("REST request to get all Stores");
        return storeRepository.findAll();
    }

    /**
     * {@code GET  /stores/:id} : get the "id" store.
     *
     * @param id the id of the store to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the store, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stores/{id}")
    public ResponseEntity<Store> getStore(@PathVariable Long id) {
        log.debug("REST request to get Store : {}", id);
        Optional<Store> store = storeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(store);
    }

    /**
     * {@code DELETE  /stores/:id} : delete the "id" store.
     *
     * @param id the id of the store to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stores/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        log.debug("REST request to delete Store : {}", id);
        storeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
