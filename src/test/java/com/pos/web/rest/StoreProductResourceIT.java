package com.pos.web.rest;

import com.pos.PosSystemApp;
import com.pos.SampleObjects;
import com.pos.domain.*;
import com.pos.domain.dto.ProductDto;
import com.pos.domain.dto.StoreDto;
import com.pos.repository.*;
import com.pos.service.ProductService;
import com.pos.service.StoreProductService;
import com.pos.service.StoreService;
import com.pos.service.dto.StoreProductDTO;
import com.pos.service.mapper.StoreProductMapper;
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
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StoreProductResource} REST controller.
 */
@SpringBootTest(classes = PosSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class StoreProductResourceIT {

    private static final Long DEFAULT_PRODUCT_ID = 1L;
    private static final Long UPDATED_PRODUCT_ID = 2L;

    private static final Long DEFAULT_STORE_ID = 1L;
    private static final Long UPDATED_STORE_ID = 2L;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Timestamp DEFAULT_CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());
    private static final Timestamp UPDATED_CREATED_DATE = Timestamp.valueOf(LocalDateTime.now());

    @Autowired
    private StoreProductRepository storeProductRepository;

    @Autowired
    private StoreProductMapper storeProductMapper;

    @Autowired
    private StoreProductService storeProductService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private ProductService productService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStoreProductMockMvc;

    private StoreProduct storeProduct;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public StoreProduct createEntity(EntityManager em) {

        Employee emp = SampleObjects.getEmployee();
        emp = employeeRepository.save(emp);

        StoreDto storeDto = SampleObjects.getStoreDto();
        storeDto.setManagedBy(emp.getId());
        Store store = storeService.saveStore(storeDto);

        ProductCategory productCategory = SampleObjects.getProductCategory();
        productCategory = productCategoryRepository.save(productCategory);

        Supplier supplier = SampleObjects.getSupplier();
        supplier = supplierRepository.save(supplier);

        ProductDto productDto = SampleObjects.getProductDto();
        productDto.setCategoryId(productCategory.getId());
        productDto.setSupplierId(supplier.getId());
        Product product = productService.saveProduct(productDto);

        StoreProduct storeProduct = new StoreProduct()
            .product(product)
            .store(store)
            .quantity(DEFAULT_QUANTITY)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE);
        return storeProduct;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public StoreProduct createUpdatedEntity(EntityManager em) {
        Employee emp = SampleObjects.getEmployee();
        emp = employeeRepository.save(emp);

        StoreDto storeDto = SampleObjects.getStoreDto();
        storeDto.setManagedBy(emp.getId());
        Store store = storeService.saveStore(storeDto);

        ProductCategory productCategory = SampleObjects.getProductCategory();
        productCategory = productCategoryRepository.save(productCategory);

        Supplier supplier = SampleObjects.getSupplier();
        supplier = supplierRepository.save(supplier);

        ProductDto productDto = SampleObjects.getProductDto();
        productDto.setCategoryId(productCategory.getId());
        productDto.setSupplierId(supplier.getId());
        Product product = productService.saveProduct(productDto);

        StoreProduct storeProduct = new StoreProduct()
            .product(product)
            .store(store)
            .quantity(UPDATED_QUANTITY)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);
        return storeProduct;
    }

    @BeforeEach
    public void initTest() {
        storeProduct = createEntity(em);
    }

    @Test
    @Transactional
    public void createStoreProduct() throws Exception {
        int databaseSizeBeforeCreate = storeProductRepository.findAll().size();
        // Create the StoreProduct
        StoreProductDTO storeProductDTO = storeProduct.toStoreProductDTO();
        restStoreProductMockMvc.perform(post("/api/store-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storeProductDTO)))
            .andExpect(status().isCreated());

        // Validate the StoreProduct in the database
        List<StoreProduct> storeProductList = storeProductRepository.findAll();
        assertThat(storeProductList).hasSize(databaseSizeBeforeCreate + 1);
        StoreProduct testStoreProduct = storeProductList.get(storeProductList.size() - 1);
        assertThat(testStoreProduct.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createStoreProductWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = storeProductRepository.findAll().size();

        // Create the StoreProduct with an existing ID
        storeProduct.setId(1L);
        StoreProductDTO storeProductDTO = storeProduct.toStoreProductDTO();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStoreProductMockMvc.perform(post("/api/store-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storeProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StoreProduct in the database
        List<StoreProduct> storeProductList = storeProductRepository.findAll();
        assertThat(storeProductList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStoreProducts() throws Exception {
        // Initialize the database
        storeProductRepository.saveAndFlush(storeProduct);

        // Get all the storeProductList
        restStoreProductMockMvc.perform(get("/api/store-products?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(storeProduct.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getStoreProduct() throws Exception {
        // Initialize the database
        storeProductRepository.saveAndFlush(storeProduct);

        // Get the storeProduct
        restStoreProductMockMvc.perform(get("/api/store-products/{id}", storeProduct.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(storeProduct.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingStoreProduct() throws Exception {
        // Get the storeProduct
        restStoreProductMockMvc.perform(get("/api/store-products/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStoreProduct() throws Exception {
        // Initialize the database
        storeProductRepository.saveAndFlush(storeProduct);

        int databaseSizeBeforeUpdate = storeProductRepository.findAll().size();

        // Update the storeProduct
        StoreProduct updatedStoreProduct = storeProductRepository.findById(storeProduct.getId()).get();

        Employee emp = SampleObjects.getEmployee();
        emp = employeeRepository.save(emp);

        StoreDto storeDto = SampleObjects.getStoreDto();
        storeDto.setManagedBy(emp.getId());
        Store store = storeService.saveStore(storeDto);

        ProductCategory productCategory = SampleObjects.getProductCategory();
        productCategory = productCategoryRepository.save(productCategory);

        Supplier supplier = SampleObjects.getSupplier();
        supplier = supplierRepository.save(supplier);

        ProductDto productDto = SampleObjects.getProductDto();
        productDto.setCategoryId(productCategory.getId());
        productDto.setSupplierId(supplier.getId());
        Product product = productService.saveProduct(productDto);

        storeProduct.setProduct(product);
        storeProduct.setStore(store);

        // Disconnect from session so that the updates on updatedStoreProduct are not directly saved in db
        em.detach(updatedStoreProduct);
        updatedStoreProduct
            .product(product)
            .store(store)
            .quantity(UPDATED_QUANTITY)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);
        StoreProductDTO storeProductDTO = updatedStoreProduct.toStoreProductDTO();

        restStoreProductMockMvc.perform(put("/api/store-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storeProductDTO)))
            .andExpect(status().isOk());

        // Validate the StoreProduct in the database
        List<StoreProduct> storeProductList = storeProductRepository.findAll();
        assertThat(storeProductList).hasSize(databaseSizeBeforeUpdate);
        StoreProduct testStoreProduct = storeProductList.get(storeProductList.size() - 1);
        assertThat(testStoreProduct.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingStoreProduct() throws Exception {
        int databaseSizeBeforeUpdate = storeProductRepository.findAll().size();

        // Create the StoreProduct
        StoreProductDTO storeProductDTO = storeProduct.toStoreProductDTO();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStoreProductMockMvc.perform(put("/api/store-products")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(storeProductDTO)))
            .andExpect(status().isBadRequest());

        // Validate the StoreProduct in the database
        List<StoreProduct> storeProductList = storeProductRepository.findAll();
        assertThat(storeProductList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStoreProduct() throws Exception {
        // Initialize the database
        storeProductRepository.saveAndFlush(storeProduct);

        int databaseSizeBeforeDelete = storeProductRepository.findAll().size();

        // Delete the storeProduct
        restStoreProductMockMvc.perform(delete("/api/store-products/{id}", storeProduct.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StoreProduct> storeProductList = storeProductRepository.findAll();
        assertThat(storeProductList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
