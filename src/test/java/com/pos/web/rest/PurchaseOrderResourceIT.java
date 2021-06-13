package com.pos.web.rest;

import com.pos.PosSystemApp;
import com.pos.domain.PurchaseOrder;
import com.pos.repository.PurchaseOrderRepository;
import com.pos.service.PurchaseOrderService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pos.domain.enumeration.PaymentType;
import com.pos.domain.enumeration.OrderStatus;
import com.pos.domain.enumeration.PaymentStatus;
/**
 * Integration tests for the {@link PurchaseOrderResource} REST controller.
 */
@SpringBootTest(classes = PosSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PurchaseOrderResourceIT {

    private static final Long DEFAULT_SUPPLIER_ID = 1L;
    private static final Long UPDATED_SUPPLIER_ID = 2L;

    private static final Double DEFAULT_TOTAL_AMOUNT = 1D;
    private static final Double UPDATED_TOTAL_AMOUNT = 2D;

    private static final PaymentType DEFAULT_PAYMENT_TYPE = PaymentType.CREDIT;
    private static final PaymentType UPDATED_PAYMENT_TYPE = PaymentType.CASH;

    private static final OrderStatus DEFAULT_ORDER_STATUS = OrderStatus.COMPLETED;
    private static final OrderStatus UPDATED_ORDER_STATUS = OrderStatus.INPROGRESS;

    private static final PaymentStatus DEFAULT_PAYMENT_STATUS = PaymentStatus.PAID;
    private static final PaymentStatus UPDATED_PAYMENT_STATUS = PaymentStatus.UNPAID;

    private static final LocalDate DEFAULT_SHIPPING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_SHIPPING_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_SHIPPING_REQUIRED = false;
    private static final Boolean UPDATED_SHIPPING_REQUIRED = true;

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPurchaseOrderMockMvc;

    private PurchaseOrder purchaseOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrder createEntity(EntityManager em) {
        PurchaseOrder purchaseOrder = new PurchaseOrder()
            .supplierId(DEFAULT_SUPPLIER_ID)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .paymentType(DEFAULT_PAYMENT_TYPE)
            .orderStatus(DEFAULT_ORDER_STATUS)
            .paymentStatus(DEFAULT_PAYMENT_STATUS)
            .shippingDate(DEFAULT_SHIPPING_DATE)
            .shippingRequired(DEFAULT_SHIPPING_REQUIRED)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .remarks(DEFAULT_REMARKS);
        return purchaseOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PurchaseOrder createUpdatedEntity(EntityManager em) {
        PurchaseOrder purchaseOrder = new PurchaseOrder()
            .supplierId(UPDATED_SUPPLIER_ID)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .orderStatus(UPDATED_ORDER_STATUS)
            .paymentStatus(UPDATED_PAYMENT_STATUS)
            .shippingDate(UPDATED_SHIPPING_DATE)
            .shippingRequired(UPDATED_SHIPPING_REQUIRED)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .remarks(UPDATED_REMARKS);
        return purchaseOrder;
    }

    @BeforeEach
    public void initTest() {
        purchaseOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurchaseOrder() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderRepository.findAll().size();
        // Create the PurchaseOrder
        restPurchaseOrderMockMvc.perform(post("/api/purchase-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrder)))
            .andExpect(status().isCreated());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeCreate + 1);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getSupplierId()).isEqualTo(DEFAULT_SUPPLIER_ID);
        assertThat(testPurchaseOrder.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testPurchaseOrder.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
        assertThat(testPurchaseOrder.getOrderStatus()).isEqualTo(DEFAULT_ORDER_STATUS);
        assertThat(testPurchaseOrder.getPaymentStatus()).isEqualTo(DEFAULT_PAYMENT_STATUS);
        assertThat(testPurchaseOrder.getShippingDate()).isEqualTo(DEFAULT_SHIPPING_DATE);
        assertThat(testPurchaseOrder.isShippingRequired()).isEqualTo(DEFAULT_SHIPPING_REQUIRED);
        assertThat(testPurchaseOrder.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testPurchaseOrder.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testPurchaseOrder.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createPurchaseOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purchaseOrderRepository.findAll().size();

        // Create the PurchaseOrder with an existing ID
        purchaseOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurchaseOrderMockMvc.perform(post("/api/purchase-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkShippingRequiredIsRequired() throws Exception {
        int databaseSizeBeforeTest = purchaseOrderRepository.findAll().size();
        // set the field null
        purchaseOrder.setShippingRequired(null);

        // Create the PurchaseOrder, which fails.


        restPurchaseOrderMockMvc.perform(post("/api/purchase-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrder)))
            .andExpect(status().isBadRequest());

        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPurchaseOrders() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        // Get all the purchaseOrderList
        restPurchaseOrderMockMvc.perform(get("/api/purchase-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purchaseOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].supplierId").value(hasItem(DEFAULT_SUPPLIER_ID.intValue())))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].orderStatus").value(hasItem(DEFAULT_ORDER_STATUS.toString())))
            .andExpect(jsonPath("$.[*].paymentStatus").value(hasItem(DEFAULT_PAYMENT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].shippingDate").value(hasItem(DEFAULT_SHIPPING_DATE.toString())))
            .andExpect(jsonPath("$.[*].shippingRequired").value(hasItem(DEFAULT_SHIPPING_REQUIRED.booleanValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS)));
    }
    
    @Test
    @Transactional
    public void getPurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderRepository.saveAndFlush(purchaseOrder);

        // Get the purchaseOrder
        restPurchaseOrderMockMvc.perform(get("/api/purchase-orders/{id}", purchaseOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(purchaseOrder.getId().intValue()))
            .andExpect(jsonPath("$.supplierId").value(DEFAULT_SUPPLIER_ID.intValue()))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()))
            .andExpect(jsonPath("$.orderStatus").value(DEFAULT_ORDER_STATUS.toString()))
            .andExpect(jsonPath("$.paymentStatus").value(DEFAULT_PAYMENT_STATUS.toString()))
            .andExpect(jsonPath("$.shippingDate").value(DEFAULT_SHIPPING_DATE.toString()))
            .andExpect(jsonPath("$.shippingRequired").value(DEFAULT_SHIPPING_REQUIRED.booleanValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS));
    }
    @Test
    @Transactional
    public void getNonExistingPurchaseOrder() throws Exception {
        // Get the purchaseOrder
        restPurchaseOrderMockMvc.perform(get("/api/purchase-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderService.save(purchaseOrder);

        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();

        // Update the purchaseOrder
        PurchaseOrder updatedPurchaseOrder = purchaseOrderRepository.findById(purchaseOrder.getId()).get();
        // Disconnect from session so that the updates on updatedPurchaseOrder are not directly saved in db
        em.detach(updatedPurchaseOrder);
        updatedPurchaseOrder
            .supplierId(UPDATED_SUPPLIER_ID)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .paymentType(UPDATED_PAYMENT_TYPE)
            .orderStatus(UPDATED_ORDER_STATUS)
            .paymentStatus(UPDATED_PAYMENT_STATUS)
            .shippingDate(UPDATED_SHIPPING_DATE)
            .shippingRequired(UPDATED_SHIPPING_REQUIRED)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .remarks(UPDATED_REMARKS);

        restPurchaseOrderMockMvc.perform(put("/api/purchase-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurchaseOrder)))
            .andExpect(status().isOk());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
        PurchaseOrder testPurchaseOrder = purchaseOrderList.get(purchaseOrderList.size() - 1);
        assertThat(testPurchaseOrder.getSupplierId()).isEqualTo(UPDATED_SUPPLIER_ID);
        assertThat(testPurchaseOrder.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testPurchaseOrder.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
        assertThat(testPurchaseOrder.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
        assertThat(testPurchaseOrder.getPaymentStatus()).isEqualTo(UPDATED_PAYMENT_STATUS);
        assertThat(testPurchaseOrder.getShippingDate()).isEqualTo(UPDATED_SHIPPING_DATE);
        assertThat(testPurchaseOrder.isShippingRequired()).isEqualTo(UPDATED_SHIPPING_REQUIRED);
        assertThat(testPurchaseOrder.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testPurchaseOrder.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testPurchaseOrder.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingPurchaseOrder() throws Exception {
        int databaseSizeBeforeUpdate = purchaseOrderRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurchaseOrderMockMvc.perform(put("/api/purchase-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(purchaseOrder)))
            .andExpect(status().isBadRequest());

        // Validate the PurchaseOrder in the database
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurchaseOrder() throws Exception {
        // Initialize the database
        purchaseOrderService.save(purchaseOrder);

        int databaseSizeBeforeDelete = purchaseOrderRepository.findAll().size();

        // Delete the purchaseOrder
        restPurchaseOrderMockMvc.perform(delete("/api/purchase-orders/{id}", purchaseOrder.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findAll();
        assertThat(purchaseOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
