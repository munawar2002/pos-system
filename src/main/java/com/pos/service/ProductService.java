package com.pos.service;

import com.pos.domain.Product;
import com.pos.domain.ProductCategory;
import com.pos.domain.Supplier;
import com.pos.domain.dto.ProductDto;
import com.pos.repository.ProductCategoryRepository;
import com.pos.repository.ProductRepository;
import com.pos.repository.SupplierRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    public Product saveProduct(ProductDto productDto){
        Product product = new Product();
        BeanUtils.copyProperties(productDto,product);

        ProductCategory productCategory =
            productCategoryRepository.findById(productDto.getCategoryId())
            .orElseThrow(()-> new RuntimeException("Product category not found with id "+productDto.getCategoryId()));

        Supplier supplier = supplierRepository.findById(productDto.getSupplierId())
            .orElseThrow(()-> new RuntimeException("Supplier not found with id "+productDto.getSupplierId()));


        product.setCategory(productCategory);
        product.setSupplier(supplier);
        product.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));

        return productRepository.save(product);
    }

}
