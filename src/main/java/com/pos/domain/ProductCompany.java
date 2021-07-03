package com.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * A ProductCompany.
 */
@Entity
@Table(name = "product_componay")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductCompany implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_no")
    private String contactNo;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "contact_person_no")
    private String contactPersonNo;

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

    public String getName() {
        return name;
    }

    public ProductCompany name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public ProductCompany address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNo() {
        return contactNo;
    }

    public ProductCompany contactNo(String contactNo) {
        this.contactNo = contactNo;
        return this;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public ProductCompany contactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
        return this;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPersonNo() {
        return contactPersonNo;
    }

    public ProductCompany contactPersonNo(String contactPersonNo) {
        this.contactPersonNo = contactPersonNo;
        return this;
    }

    public void setContactPersonNo(String contactPersonNo) {
        this.contactPersonNo = contactPersonNo;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public ProductCompany createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public ProductCompany createdDate(Timestamp createdDate) {
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
        if (!(o instanceof ProductCompany)) {
            return false;
        }
        return id != null && id.equals(((ProductCompany) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductCompany{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", contactNo='" + getContactNo() + "'" +
            ", contactPerson='" + getContactPerson() + "'" +
            ", contactPersonNo='" + getContactPersonNo() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
