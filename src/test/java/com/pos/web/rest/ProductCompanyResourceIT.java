package com.pos.web.rest;

import com.pos.PosSystemApp;
import com.pos.domain.ProductCompany;
import com.pos.repository.ProductCompanyRepository;

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

/**
 * Integration tests for the {@link ProductCompanyResource} REST controller.
 */
@SpringBootTest(classes = PosSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProductCompanyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_NO = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PERSON = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_PERSON_NO = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_PERSON_NO = "BBBBBBBBBB";

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ProductCompanyRepository productCompanyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductCompanyMockMvc;

    private ProductCompany productCompany;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductCompany createEntity(EntityManager em) {
        ProductCompany productCompany = new ProductCompany()
            .name(DEFAULT_NAME)
            .address(DEFAULT_ADDRESS)
            .contactNo(DEFAULT_CONTACT_NO)
            .contactPerson(DEFAULT_CONTACT_PERSON)
            .contactPersonNo(DEFAULT_CONTACT_PERSON_NO)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE);
        return productCompany;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductCompany createUpdatedEntity(EntityManager em) {
        ProductCompany productCompany = new ProductCompany()
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .contactNo(UPDATED_CONTACT_NO)
            .contactPerson(UPDATED_CONTACT_PERSON)
            .contactPersonNo(UPDATED_CONTACT_PERSON_NO)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);
        return productCompany;
    }

    @BeforeEach
    public void initTest() {
        productCompany = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductCompany() throws Exception {
        int databaseSizeBeforeCreate = productCompanyRepository.findAll().size();
        // Create the ProductCompany
        restProductCompanyMockMvc.perform(post("/api/product-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productCompany)))
            .andExpect(status().isCreated());

        // Validate the ProductCompany in the database
        List<ProductCompany> productCompanyList = productCompanyRepository.findAll();
        assertThat(productCompanyList).hasSize(databaseSizeBeforeCreate + 1);
        ProductCompany testProductCompany = productCompanyList.get(productCompanyList.size() - 1);
        assertThat(testProductCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProductCompany.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testProductCompany.getContactNo()).isEqualTo(DEFAULT_CONTACT_NO);
        assertThat(testProductCompany.getContactPerson()).isEqualTo(DEFAULT_CONTACT_PERSON);
        assertThat(testProductCompany.getContactPersonNo()).isEqualTo(DEFAULT_CONTACT_PERSON_NO);
        assertThat(testProductCompany.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testProductCompany.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createProductCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productCompanyRepository.findAll().size();

        // Create the ProductCompany with an existing ID
        productCompany.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductCompanyMockMvc.perform(post("/api/product-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productCompany)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCompany in the database
        List<ProductCompany> productCompanyList = productCompanyRepository.findAll();
        assertThat(productCompanyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProductCompanies() throws Exception {
        // Initialize the database
        productCompanyRepository.saveAndFlush(productCompany);

        // Get all the productCompanyList
        restProductCompanyMockMvc.perform(get("/api/product-companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productCompany.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].contactNo").value(hasItem(DEFAULT_CONTACT_NO)))
            .andExpect(jsonPath("$.[*].contactPerson").value(hasItem(DEFAULT_CONTACT_PERSON)))
            .andExpect(jsonPath("$.[*].contactPersonNo").value(hasItem(DEFAULT_CONTACT_PERSON_NO)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getProductCompany() throws Exception {
        // Initialize the database
        productCompanyRepository.saveAndFlush(productCompany);

        // Get the productCompany
        restProductCompanyMockMvc.perform(get("/api/product-companies/{id}", productCompany.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productCompany.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.contactNo").value(DEFAULT_CONTACT_NO))
            .andExpect(jsonPath("$.contactPerson").value(DEFAULT_CONTACT_PERSON))
            .andExpect(jsonPath("$.contactPersonNo").value(DEFAULT_CONTACT_PERSON_NO))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProductCompany() throws Exception {
        // Get the productCompany
        restProductCompanyMockMvc.perform(get("/api/product-companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductCompany() throws Exception {
        // Initialize the database
        productCompanyRepository.saveAndFlush(productCompany);

        int databaseSizeBeforeUpdate = productCompanyRepository.findAll().size();

        // Update the productCompany
        ProductCompany updatedProductCompany = productCompanyRepository.findById(productCompany.getId()).get();
        // Disconnect from session so that the updates on updatedProductCompany are not directly saved in db
        em.detach(updatedProductCompany);
        updatedProductCompany
            .name(UPDATED_NAME)
            .address(UPDATED_ADDRESS)
            .contactNo(UPDATED_CONTACT_NO)
            .contactPerson(UPDATED_CONTACT_PERSON)
            .contactPersonNo(UPDATED_CONTACT_PERSON_NO)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE);

        restProductCompanyMockMvc.perform(put("/api/product-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductCompany)))
            .andExpect(status().isOk());

        // Validate the ProductCompany in the database
        List<ProductCompany> productCompanyList = productCompanyRepository.findAll();
        assertThat(productCompanyList).hasSize(databaseSizeBeforeUpdate);
        ProductCompany testProductCompany = productCompanyList.get(productCompanyList.size() - 1);
        assertThat(testProductCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProductCompany.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testProductCompany.getContactNo()).isEqualTo(UPDATED_CONTACT_NO);
        assertThat(testProductCompany.getContactPerson()).isEqualTo(UPDATED_CONTACT_PERSON);
        assertThat(testProductCompany.getContactPersonNo()).isEqualTo(UPDATED_CONTACT_PERSON_NO);
        assertThat(testProductCompany.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testProductCompany.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingProductCompany() throws Exception {
        int databaseSizeBeforeUpdate = productCompanyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductCompanyMockMvc.perform(put("/api/product-companies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productCompany)))
            .andExpect(status().isBadRequest());

        // Validate the ProductCompany in the database
        List<ProductCompany> productCompanyList = productCompanyRepository.findAll();
        assertThat(productCompanyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductCompany() throws Exception {
        // Initialize the database
        productCompanyRepository.saveAndFlush(productCompany);

        int databaseSizeBeforeDelete = productCompanyRepository.findAll().size();

        // Delete the productCompany
        restProductCompanyMockMvc.perform(delete("/api/product-companies/{id}", productCompany.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductCompany> productCompanyList = productCompanyRepository.findAll();
        assertThat(productCompanyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
