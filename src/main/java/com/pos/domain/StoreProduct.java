package com.pos.domain;

import com.pos.service.dto.StoreProductDTO;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;

/**
 * A StoreProduct.
 */
@Entity
@Table(name = "store_product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class StoreProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_date")
    private Timestamp createdDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public StoreProduct product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Store getStore() {
        return store;
    }

    public StoreProduct store(Store store) {
        this.store = store;
        return this;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public StoreProduct quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public StoreProduct createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public StoreProduct createdDate(Timestamp createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    public StoreProductDTO toStoreProductDTO(){
        StoreProductDTO storeProductDTO = new StoreProductDTO();
        BeanUtils.copyProperties(this,storeProductDTO);
        storeProductDTO.setProductId(getProduct().getId());
        storeProductDTO.setStoreId(getStore().getId());
        return storeProductDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StoreProduct)) {
            return false;
        }
        return id != null && id.equals(((StoreProduct) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {

        String storeName = getStore()!=null?
            getStore().getName()!=null?
                getStore().getName() :"" : "";

        String productName = getProduct()!=null?
            getProduct().getName()!=null?
                getProduct().getName() :"" : "";

        return "StoreProduct{" +
            "id=" + getId() +
            ", product=" + productName +
            ", store=" + storeName +
            ", quantity=" + getQuantity() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
