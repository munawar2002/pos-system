package com.pos.domain;

import com.pos.domain.dto.ProductDto;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private ProductCategory category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_company_id")
    private ProductCompany productCompany;

    @Column(name = "buy_price")
    private Double buyPrice;

    @Column(name = "sell_price")
    private Double sellPrice;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

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

    public String getCode() {
        return code;
    }

    public Product code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public Product category(ProductCategory category) {
        this.category = category;
        return this;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public ProductCompany getProductCompany() {
        return productCompany;
    }

    public Product productCompany(ProductCompany productCompany) {
        this.productCompany = productCompany;
        return this;
    }

    public void setProductCompany(ProductCompany productCompany) {
        this.productCompany = productCompany;
    }

    public Double getBuyPrice() {
        return buyPrice;
    }

    public Product buyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
        return this;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Double getSellPrice() {
        return sellPrice;
    }

    public Product sellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
        return this;
    }

    public void setSellPrice(Double sellPrice) {
        this.sellPrice = sellPrice;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Product photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Product photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Product createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public Product createdDate(Timestamp createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Timestamp createdDate) {
        this.createdDate = createdDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    public ProductDto toProductDto(){
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(this,productDto);
        if(getCategory()!= null) {
            productDto.setCategoryId(getCategory().getId());
        }
        if(getProductCompany()!= null){
            productDto.setProductCompanyId(getProductCompany().getId());
        }
        return productDto;
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        String categoryName = getCategory()!=null?
            getCategory().getName()!=null?
                getCategory().getName() : "" : "";

        String productCompany = getProductCompany()!=null?
            getProductCompany().getName()!=null?
                getProductCompany().getName() : "" : "";

        return "Product{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", category=" + categoryName +
            ", productCompany=" + productCompany +
            ", buyPrice=" + getBuyPrice() +
            ", sellPrice=" + getSellPrice() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
