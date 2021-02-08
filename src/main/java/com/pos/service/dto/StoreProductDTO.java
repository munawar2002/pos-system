package com.pos.service.dto;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.io.Serializable;

/**
 * A DTO for the {@link com.pos.domain.StoreProduct} entity.
 */
public class StoreProductDTO implements Serializable {

    private Long id;

    private Long productId;

    private Long storeId;

    private Integer quantity;

    private String createdBy;

    private Timestamp createdDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StoreProductDTO)) {
            return false;
        }

        return id != null && id.equals(((StoreProductDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StoreProductDTO{" +
            "id=" + getId() +
            ", productId=" + getProductId() +
            ", storeId=" + getStoreId() +
            ", quantity=" + getQuantity() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
