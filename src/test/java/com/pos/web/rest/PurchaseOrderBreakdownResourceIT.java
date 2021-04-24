package com.pos.web.rest;

import com.pos.PosSystemApp;
import com.pos.domain.PurchaseOrderBreakdown;
import com.pos.repository.PurchaseOrderBreakdownRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PurchaseOrderBreakdownResource} REST controller.
 */
@SpringBootTest(classes = PosSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PurchaseOrderBreakdownResourceIT {

    private static final Long DEFAULT_PURCHASE_ORDER_ID = 1L;
    private static final Long UPDATED_PURCHASE_ORDER_ID = 2L;

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_UNIT_PRICE = 1D;
    private static final Double UPDATED_UNIT_PRICE = 2D;

    @Autowired
    private PurchaseOrderBreakdownRepository purchaseOrderBreakdownRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchaseOrderBreakdownMockMvc;

    private PurchaseOrderBreakdown purchaseOrderBreakdown;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrderBreakdown createEntity(EntityManager em) {
        PurchaseOrderBreakdown purchaseOrderBreakdown = new PurchaseOrderBreakdown()
            .purchaseOrderId(DEFAULT_PURCHASE_ORDER_ID)
            .productId(DEFAULT_PRODUCT_ID)
            .quantity(DEFAULT_QUANTITY)
            .unitPrice(DEFAULT_UNIT_PRICE);
        return purchaseOrderBreakdown;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrderBreakdown createUpdatedEntity(EntityManager em) {
        PurchaseOrderBreakdown purchaseOrderBreakdown = new PurchaseOrderBreakdown()
            .purchaseOrderId(UPDATED_PURCHASE_ORDER_ID)
            .productId(UPDATED_PRODUCT_ID)
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE);
        return purchaseOrderBreakdown;
    }

    @BeforeEach
    public void initTest() {
        purchaseOrderBreakdown = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseOrderBreakdown() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderBreakdownRepository.findAll().size();
        // Create the PurchaseOrderBreakdown
        restPurchaseOrderBreakdownMockMvc.perform(post("/api/purchase-order-breakdowns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderBreakdown)))
            .andExpect(status().isCreated());

        // Validate the PurchaseOrderBreakdown in the database
        List<PurchaseOrderBreakdown> purchaseOrderBreakdownList = purchaseOrderBreakdownRepository.findAll();
        assertThat(purchaseOrderBreakdownList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseOrderBreakdown testPurchaseOrderBreakdown = purchaseOrderBreakdownList.get(purchaseOrderBreakdownList.size() - 1);
        assertThat(testPurchaseOrderBreakdown.getPurchaseOrderId()).isEqualTo(DEFAULT_PURCHASE_ORDER_ID);
        assertThat(testPurchaseOrderBreakdown.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testPurchaseOrderBreakdown.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testPurchaseOrderBreakdown.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
    }

    @Test
    @Transactional
    public void createPurchaseOrderBreakdownWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderBreakdownRepository.findAll().size();

        // Create the PurchaseOrderBreakdown with an existing ID
        purchaseOrderBreakdown.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseOrderBreakdownMockMvc.perform(post("/api/purchase-order-breakdowns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderBreakdown)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrderBreakdown in the database
        List<PurchaseOrderBreakdown> purchaseOrderBreakdownList = purchaseOrderBreakdownRepository.findAll();
        assertThat(purchaseOrderBreakdownList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPurchaseOrderBreakdowns() throws Exception {
        // Initialize the database
        purchaseOrderBreakdownRepository.saveAndFlush(purchaseOrderBreakdown);

        // Get all the purchaseOrderBreakdownList
        restPurchaseOrderBreakdownMockMvc.perform(get("/api/purchase-order-breakdowns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseOrderBreakdown.getId().intValue())))
            .andExpect(jsonPath("$.[*].purchaseOrderId").value(hasItem(DEFAULT_PURCHASE_ORDER_ID.intValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPurchaseOrderBreakdown() throws Exception {
        // Initialize the database
        purchaseOrderBreakdownRepository.saveAndFlush(purchaseOrderBreakdown);

        // Get the purchaseOrderBreakdown
        restPurchaseOrderBreakdownMockMvc.perform(get("/api/purchase-order-breakdowns/{id}", purchaseOrderBreakdown.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseOrderBreakdown.getId().intValue()))
            .andExpect(jsonPath("$.purchaseOrderId").value(DEFAULT_PURCHASE_ORDER_ID.intValue()))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID.intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseOrderBreakdown() throws Exception {
        // Get the purchaseOrderBreakdown
        restPurchaseOrderBreakdownMockMvc.perform(get("/api/purchase-order-breakdowns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseOrderBreakdown() throws Exception {
        // Initialize the database
        purchaseOrderBreakdownRepository.saveAndFlush(purchaseOrderBreakdown);

        int databaseSizeBeforeUpdate = purchaseOrderBreakdownRepository.findAll().size();

        // Update the purchaseOrderBreakdown
        PurchaseOrderBreakdown updatedPurchaseOrderBreakdown = purchaseOrderBreakdownRepository.findById(purchaseOrderBreakdown.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseOrderBreakdown are not directly saved in db
        em.detach(updatedPurchaseOrderBreakdown);
        updatedPurchaseOrderBreakdown
            .purchaseOrderId(UPDATED_PURCHASE_ORDER_ID)
            .productId(UPDATED_PRODUCT_ID)
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE);

        restPurchaseOrderBreakdownMockMvc.perform(put("/api/purchase-order-breakdowns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseOrderBreakdown)))
            .andExpect(status().isOk());

        // Validate the PurchaseOrderBreakdown in the database
        List<PurchaseOrderBreakdown> purchaseOrderBreakdownList = purchaseOrderBreakdownRepository.findAll();
        assertThat(purchaseOrderBreakdownList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrderBreakdown testPurchaseOrderBreakdown = purchaseOrderBreakdownList.get(purchaseOrderBreakdownList.size() - 1);
        assertThat(testPurchaseOrderBreakdown.getPurchaseOrderId()).isEqualTo(UPDATED_PURCHASE_ORDER_ID);
        assertThat(testPurchaseOrderBreakdown.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testPurchaseOrderBreakdown.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testPurchaseOrderBreakdown.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseOrderBreakdown() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderBreakdownRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseOrderBreakdownMockMvc.perform(put("/api/purchase-order-breakdowns")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrderBreakdown)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrderBreakdown in the database
        List<PurchaseOrderBreakdown> purchaseOrderBreakdownList = purchaseOrderBreakdownRepository.findAll();
        assertThat(purchaseOrderBreakdownList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseOrderBreakdown() throws Exception {
        // Initialize the database
        purchaseOrderBreakdownRepository.saveAndFlush(purchaseOrderBreakdown);

        int databaseSizeBeforeDelete = purchaseOrderBreakdownRepository.findAll().size();

        // Delete the purchaseOrderBreakdown
        restPurchaseOrderBreakdownMockMvc.perform(delete("/api/purchase-order-breakdowns/{id}", purchaseOrderBreakdown.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseOrderBreakdown> purchaseOrderBreakdownList = purchaseOrderBreakdownRepository.findAll();
        assertThat(purchaseOrderBreakdownList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
