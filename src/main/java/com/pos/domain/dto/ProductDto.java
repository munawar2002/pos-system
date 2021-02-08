package com.pos.domain.dto;

import com.pos.domain.Product;
import com.pos.domain.ProductCategory;
import com.pos.service.dto.StoreProductDTO;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class ProductDto {
    private Long id;
    @NotNull
    private String code;
    @NotNull
    private String name;
    private long categoryId;
    private long supplierId;
    private Double buyPrice;
    private Double sellPrice;
    private byte[] photo;
    private String photoContentType;
    private List<StoreProductDTO> storeProductDTOS;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(long supplierId) {
        this.supplierId = supplierId;
    }

    public Double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Double getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public List<StoreProductDTO> getStoreProductDTOS() {
        if(storeProductDTOS == null){
            storeProductDTOS = new ArrayList<>();
        }
        return storeProductDTOS;
    }

    public void setStoreProductDTOS(List<StoreProductDTO> storeProductDTOS) {
        this.storeProductDTOS = storeProductDTOS;
    }

    public List<StoreProductDTO> addStoreProductDTO(StoreProductDTO storeProductDTO){
        if(storeProductDTOS == null){
            storeProductDTOS = new ArrayList<>();
        }
        storeProductDTOS.add(storeProductDTO);
        return storeProductDTOS;
    }
}
