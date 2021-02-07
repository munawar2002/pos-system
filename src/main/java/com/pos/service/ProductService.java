package com.pos.service;

import com.pos.domain.Product;
import com.pos.domain.ProductCategory;
import com.pos.domain.dto.ProductDto;
import com.pos.repository.ProductCategoryRepository;
import com.pos.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public Product saveProduct(ProductDto productDto){
        Product product = new Product();
        BeanUtils.copyProperties(productDto,product);

        ProductCategory productCategory =
            productCategoryRepository.findById(productDto.getCategoryId())
            .orElseThrow(()-> new RuntimeException("Product category not found with id "+productDto.getCategoryId()));

        product.setCategory(productCategory);

        return productRepository.save(product);
    }

}
