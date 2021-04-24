package com.pos.web.rest;

import com.pos.PosSystemApp;
import com.pos.SampleObjects;
import com.pos.domain.PurchaseInvoice;
import com.pos.domain.Supplier;
import com.pos.repository.PurchaseInvoiceRepository;

import com.pos.repository.SupplierRepository;
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
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pos.domain.enumeration.PaymentType;
import com.pos.domain.enumeration.OrderStatus;
/**
 * Integration tests for the {@link PurchaseInvoiceResource} REST controller.
 */
@SpringBootTest(classes = PosSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PurchaseInvoiceResourceIT {

    private static final Long DEFAULT_SUPPLIER_ID = 1L;
    private static final Long UPDATED_SUPPLIER_ID = 2L;

    private static final PaymentType DEFAULT_PAYMENT_TYPE = PaymentType.CREDIT;
    private static final PaymentType UPDATED_PAYMENT_TYPE = PaymentType.CASH;

    private static final Long DEFAULT_PURCHASE_ORDER_ID = 1L;
    private static final Long UPDATED_PURCHASE_ORDER_ID = 2L;

    private static final OrderStatus DEFAULT_INVOICE_STATUS = OrderStatus.COMPLETED;
    private static final OrderStatus UPDATED_INVOICE_STATUS = OrderStatus.INPROGRESS;

    private static final Double DEFAULT_PAID_AMOUNT = 1D;
    private static final Double UPDATED_PAID_AMOUNT = 2D;

    private static final Long DEFAULT_TOTAL_AMOUNT = 1L;
    private static final Long UPDATED_TOTAL_AMOUNT = 2L;

    private static final Double DEFAULT_TENDERED_AMOUNT = 1D;
    private static final Double UPDATED_TENDERED_AMOUNT = 2D;

    private static final Boolean DEFAULT_DISCOUNT_AVAILED = false;
    private static final Boolean UPDATED_DISCOUNT_AVAILED = true;

    private static final Integer DEFAULT_DISCOUNT_PERCENTAGE = 1;
    private static final Integer UPDATED_DISCOUNT_PERCENTAGE = 2;

    private static final Double DEFAULT_DISCOUNT_AMOUNT = 1D;
    private static final Double UPDATED_DISCOUNT_AMOUNT = 2D;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Timestamp DEFAULT_CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());
    private static final Timestamp UPDATED_CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());

    @Autowired
    private PurchaseInvoiceRepository purchaseInvoiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchaseInvoiceMockMvc;

    @Autowired
    private SupplierRepository supplierRepository;

    private PurchaseInvoice purchaseInvoice;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public PurchaseInvoice createEntity(EntityManager em) {

        Supplier supplier = SampleObjects.getSupplier();
        supplierRepository.save(supplier);

        PurchaseInvoice purchaseInvoice = new PurchaseInvoice()
            .supplier(supplier)
            .paymentType(DEFAULT_PAYMENT_TYPE)
            .purchaseOrderId(DEFAULT_PURCHASE_ORDER_ID)
            .invoiceStatus(DEFAULT_INVOICE_STATUS)
            .paidAmount(DEFAULT_PAID_AMOUNT)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .tenderedAmount(DEFAULT_TENDERED_AMOUNT)
            .discountAvailed(DEFAULT_DISCOUNT_AVAILED)
            .discountPercentage(DEFAULT_DISCOUNT_PERCENTAGE)
            .discountAmount(DEFAULT_DISCOUNT_AMOUNT)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE);
        return purchaseInvoice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public PurchaseInvoice createUpdatedEntity(EntityManager em) {

        Supplier supplier = SampleObjects.getSupplier();
        supplierRepository.save(supplier);

        PurchaseInvoice purchaseInvoice = new PurchaseInvoice()
            .supplier(supplier)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .purchaseOrderId(UPDATED_PURCHASE_ORDER_ID)
            .invoiceStatus(UPDATED_INVOICE_STATUS)
            .paidAmount(UPDATED_PAID_AMOUNT)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .tenderedAmount(UPDATED_TENDERED_AMOUNT)
            .discountAvailed(UPDATED_DISCOUNT_AVAILED)
            .discountPercentage(UPDATED_DISCOUNT_PERCENTAGE)
            .discountAmount(UPDATED_DISCOUNT_AMOUNT)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);
        return purchaseInvoice;
    }

    @BeforeEach
    public void initTest() {
        purchaseInvoice = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseInvoice() throws Exception {
        int databaseSizeBeforeCreate = purchaseInvoiceRepository.findAll().size();
        // Create the PurchaseInvoice
        restPurchaseInvoiceMockMvc.perform(post("/api/purchase-invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseInvoice)))
            .andExpect(status().isCreated());

        // Validate the PurchaseInvoice in the database
        List<PurchaseInvoice> purchaseInvoiceList = purchaseInvoiceRepository.findAll();
        assertThat(purchaseInvoiceList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseInvoice testPurchaseInvoice = purchaseInvoiceList.get(purchaseInvoiceList.size() - 1);
        assertThat(testPurchaseInvoice.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
        assertThat(testPurchaseInvoice.getPurchaseOrderId()).isEqualTo(DEFAULT_PURCHASE_ORDER_ID);
        assertThat(testPurchaseInvoice.getInvoiceStatus()).isEqualTo(DEFAULT_INVOICE_STATUS);
        assertThat(testPurchaseInvoice.getPaidAmount()).isEqualTo(DEFAULT_PAID_AMOUNT);
        assertThat(testPurchaseInvoice.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testPurchaseInvoice.getTenderedAmount()).isEqualTo(DEFAULT_TENDERED_AMOUNT);
        assertThat(testPurchaseInvoice.isDiscountAvailed()).isEqualTo(DEFAULT_DISCOUNT_AVAILED);
        assertThat(testPurchaseInvoice.getDiscountPercentage()).isEqualTo(DEFAULT_DISCOUNT_PERCENTAGE);
        assertThat(testPurchaseInvoice.getDiscountAmount()).isEqualTo(DEFAULT_DISCOUNT_AMOUNT);
        assertThat(testPurchaseInvoice.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
    }

    @Test
    @Transactional
    public void createPurchaseInvoiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseInvoiceRepository.findAll().size();

        // Create the PurchaseInvoice with an existing ID
        purchaseInvoice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseInvoiceMockMvc.perform(post("/api/purchase-invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseInvoice)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseInvoice in the database
        List<PurchaseInvoice> purchaseInvoiceList = purchaseInvoiceRepository.findAll();
        assertThat(purchaseInvoiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPurchaseInvoices() throws Exception {
        // Initialize the database
        purchaseInvoiceRepository.saveAndFlush(purchaseInvoice);

        // Get all the purchaseInvoiceList
        restPurchaseInvoiceMockMvc.perform(get("/api/purchase-invoices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseInvoice.getId().intValue())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].purchaseOrderId").value(hasItem(DEFAULT_PURCHASE_ORDER_ID.intValue())))
            .andExpect(jsonPath("$.[*].invoiceStatus").value(hasItem(DEFAULT_INVOICE_STATUS.toString())))
            .andExpect(jsonPath("$.[*].paidAmount").value(hasItem(DEFAULT_PAID_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].tenderedAmount").value(hasItem(DEFAULT_TENDERED_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].discountAvailed").value(hasItem(DEFAULT_DISCOUNT_AVAILED.booleanValue())))
            .andExpect(jsonPath("$.[*].discountPercentage").value(hasItem(DEFAULT_DISCOUNT_PERCENTAGE)))
            .andExpect(jsonPath("$.[*].discountAmount").value(hasItem(DEFAULT_DISCOUNT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)));
    }

    @Test
    @Transactional
    public void getPurchaseInvoice() throws Exception {
        // Initialize the database
        purchaseInvoiceRepository.saveAndFlush(purchaseInvoice);

        // Get the purchaseInvoice
        restPurchaseInvoiceMockMvc.perform(get("/api/purchase-invoices/{id}", purchaseInvoice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseInvoice.getId().intValue()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()))
            .andExpect(jsonPath("$.purchaseOrderId").value(DEFAULT_PURCHASE_ORDER_ID.intValue()))
            .andExpect(jsonPath("$.invoiceStatus").value(DEFAULT_INVOICE_STATUS.toString()))
            .andExpect(jsonPath("$.paidAmount").value(DEFAULT_PAID_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.intValue()))
            .andExpect(jsonPath("$.tenderedAmount").value(DEFAULT_TENDERED_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.discountAvailed").value(DEFAULT_DISCOUNT_AVAILED.booleanValue()))
            .andExpect(jsonPath("$.discountPercentage").value(DEFAULT_DISCOUNT_PERCENTAGE))
            .andExpect(jsonPath("$.discountAmount").value(DEFAULT_DISCOUNT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseInvoice() throws Exception {
        // Get the purchaseInvoice
        restPurchaseInvoiceMockMvc.perform(get("/api/purchase-invoices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseInvoice() throws Exception {
        // Initialize the database
        purchaseInvoiceRepository.saveAndFlush(purchaseInvoice);

        int databaseSizeBeforeUpdate = purchaseInvoiceRepository.findAll().size();

        // Update the purchaseInvoice
        PurchaseInvoice updatedPurchaseInvoice = purchaseInvoiceRepository.findById(purchaseInvoice.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseInvoice are not directly saved in db
        em.detach(updatedPurchaseInvoice);
        Supplier supplier = SampleObjects.getSupplier();
        supplierRepository.save(supplier);

        updatedPurchaseInvoice
            .supplier(supplier)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .purchaseOrderId(UPDATED_PURCHASE_ORDER_ID)
            .invoiceStatus(UPDATED_INVOICE_STATUS)
            .paidAmount(UPDATED_PAID_AMOUNT)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .tenderedAmount(UPDATED_TENDERED_AMOUNT)
            .discountAvailed(UPDATED_DISCOUNT_AVAILED)
            .discountPercentage(UPDATED_DISCOUNT_PERCENTAGE)
            .discountAmount(UPDATED_DISCOUNT_AMOUNT)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);

        restPurchaseInvoiceMockMvc.perform(put("/api/purchase-invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseInvoice)))
            .andExpect(status().isOk());

        // Validate the PurchaseInvoice in the database
        List<PurchaseInvoice> purchaseInvoiceList = purchaseInvoiceRepository.findAll();
        assertThat(purchaseInvoiceList).hasSize(databaseSizeBeforeUpdate);
        PurchaseInvoice testPurchaseInvoice = purchaseInvoiceList.get(purchaseInvoiceList.size() - 1);
        assertThat(testPurchaseInvoice.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
        assertThat(testPurchaseInvoice.getPurchaseOrderId()).isEqualTo(UPDATED_PURCHASE_ORDER_ID);
        assertThat(testPurchaseInvoice.getInvoiceStatus()).isEqualTo(UPDATED_INVOICE_STATUS);
        assertThat(testPurchaseInvoice.getPaidAmount()).isEqualTo(UPDATED_PAID_AMOUNT);
        assertThat(testPurchaseInvoice.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testPurchaseInvoice.getTenderedAmount()).isEqualTo(UPDATED_TENDERED_AMOUNT);
        assertThat(testPurchaseInvoice.isDiscountAvailed()).isEqualTo(UPDATED_DISCOUNT_AVAILED);
        assertThat(testPurchaseInvoice.getDiscountPercentage()).isEqualTo(UPDATED_DISCOUNT_PERCENTAGE);
        assertThat(testPurchaseInvoice.getDiscountAmount()).isEqualTo(UPDATED_DISCOUNT_AMOUNT);
        assertThat(testPurchaseInvoice.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseInvoice() throws Exception {
        int databaseSizeBeforeUpdate = purchaseInvoiceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseInvoiceMockMvc.perform(put("/api/purchase-invoices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseInvoice)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseInvoice in the database
        List<PurchaseInvoice> purchaseInvoiceList = purchaseInvoiceRepository.findAll();
        assertThat(purchaseInvoiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseInvoice() throws Exception {
        // Initialize the database
        purchaseInvoiceRepository.saveAndFlush(purchaseInvoice);

        int databaseSizeBeforeDelete = purchaseInvoiceRepository.findAll().size();

        // Delete the purchaseInvoice
        restPurchaseInvoiceMockMvc.perform(delete("/api/purchase-invoices/{id}", purchaseInvoice.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseInvoice> purchaseInvoiceList = purchaseInvoiceRepository.findAll();
        assertThat(purchaseInvoiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
