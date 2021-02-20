package com.pos.service;

import com.pos.domain.*;
import com.pos.domain.dto.ProductDto;
import com.pos.repository.*;
import com.pos.security.SecurityUtils;
import com.pos.service.dto.StoreProductDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreProductRepository storeProductRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductCompanyRepository productCompanyRepository;

    @Transactional
    public Product saveProduct(ProductDto productDto){
        Product product = new Product();
        BeanUtils.copyProperties(productDto,product);

        ProductCategory productCategory =
            productCategoryRepository.findById(productDto.getCategoryId())
            .orElseThrow(()-> new RuntimeException("Product category not found with id "+productDto.getCategoryId()));

        ProductCompany productCompany = productCompanyRepository.findById(productDto.getProductCompanyId())
            .orElseThrow(()-> new RuntimeException("ProductCompany not found with id "+productDto.getProductCompanyId()));

        product.setCategory(productCategory);
        product.setProductCompany(productCompany);
        product.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        product.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
        product =  productRepository.save(product);

        saveStoreProducts(productDto, product);

        return product;
    }

    private void saveStoreProducts(ProductDto productDto, Product product) {
        List<StoreProduct> storeProducts = new ArrayList<>();
        for(StoreProductDTO storeProductDTO : productDto.getStoreProductDTOS()){
            StoreProduct storeProduct = new StoreProduct();
            Store store = storeRepository.findById(storeProductDTO.getStoreId())
                .orElseThrow(()-> new RuntimeException("Store not found with id "+storeProductDTO.getStoreId()));

            storeProduct.setStore(store);
            storeProduct.setProduct(product);
            storeProduct.setQuantity(storeProductDTO.getQuantity());
            storeProduct.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
            storeProduct.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
            storeProducts.add(storeProduct);
        }
        storeProductRepository.saveAll(storeProducts);
    }

}
