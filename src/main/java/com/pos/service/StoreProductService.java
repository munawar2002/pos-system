package com.pos.service;

import com.pos.domain.Product;
import com.pos.domain.Store;
import com.pos.domain.StoreProduct;
import com.pos.repository.ProductRepository;
import com.pos.repository.StoreProductRepository;
import com.pos.repository.StoreRepository;
import com.pos.security.SecurityUtils;
import com.pos.service.dto.StoreProductDTO;
import com.pos.service.mapper.StoreProductMapper;
import net.bytebuddy.asm.Advice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link StoreProduct}.
 */
@Service
@Transactional
public class StoreProductService {

    private final Logger log = LoggerFactory.getLogger(StoreProductService.class);

    private final StoreProductRepository storeProductRepository;

    private final StoreProductMapper storeProductMapper;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private ProductRepository productRepository;

    public StoreProductService(StoreProductRepository storeProductRepository, StoreProductMapper storeProductMapper) {
        this.storeProductRepository = storeProductRepository;
        this.storeProductMapper = storeProductMapper;
    }

    /**
     * Save a storeProduct.
     *
     * @param storeProductDTO the entity to save.
     * @return the persisted entity.
     */
    @Transactional
    public StoreProductDTO save(StoreProductDTO storeProductDTO) {
        log.debug("Request to save StoreProduct : {}", storeProductDTO);
        StoreProduct storeProduct = storeProductMapper.toEntity(storeProductDTO);

        Product product = productRepository.findById(storeProductDTO.getProductId())
            .orElseThrow(()-> new RuntimeException("Product not found with id "+storeProductDTO.getProductId()));

        Store store = storeRepository.findById(storeProductDTO.getStoreId())
            .orElseThrow(()-> new RuntimeException("Store not found with id "+storeProductDTO.getStoreId()));

        storeProduct.setProduct(product);
        storeProduct.setStore(store);
        storeProduct.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        storeProduct.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        storeProduct = storeProductRepository.save(storeProduct);
        return storeProductMapper.toDto(storeProduct);
    }

    /**
     * Get all the storeProducts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StoreProductDTO> findAll() {
        log.debug("Request to get all StoreProducts");
        return storeProductRepository.findAll().stream()
            .map(storeProductMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one storeProduct by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<StoreProductDTO> findOne(Long id) {
        log.debug("Request to get StoreProduct : {}", id);
        return storeProductRepository.findById(id)
            .map(storeProductMapper::toDto);
    }

    /**
     * Delete the storeProduct by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete StoreProduct : {}", id);
        storeProductRepository.deleteById(id);
    }
}
