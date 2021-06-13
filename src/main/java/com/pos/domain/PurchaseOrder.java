package com.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.pos.domain.enumeration.PaymentType;

import com.pos.domain.enumeration.OrderStatus;

import com.pos.domain.enumeration.PaymentStatus;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "shipping_date")
    private LocalDate shippingDate;

    @NotNull
    @Column(name = "shipping_required", nullable = false)
    private Boolean shippingRequired;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "remarks")
    private String remarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public PurchaseOrder supplierId(Long supplierId) {
        this.supplierId = supplierId;
        return this;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public PurchaseOrder totalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public PurchaseOrder paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public PurchaseOrder orderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public PurchaseOrder paymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
        return this;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public LocalDate getShippingDate() {
        return shippingDate;
    }

    public PurchaseOrder shippingDate(LocalDate shippingDate) {
        this.shippingDate = shippingDate;
        return this;
    }

    public void setShippingDate(LocalDate shippingDate) {
        this.shippingDate = shippingDate;
    }

    public Boolean isShippingRequired() {
        return shippingRequired;
    }

    public PurchaseOrder shippingRequired(Boolean shippingRequired) {
        this.shippingRequired = shippingRequired;
        return this;
    }

    public void setShippingRequired(Boolean shippingRequired) {
        this.shippingRequired = shippingRequired;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public PurchaseOrder createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public PurchaseOrder createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getRemarks() {
        return remarks;
    }

    public PurchaseOrder remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrder)) {
            return false;
        }
        return id != null && id.equals(((PurchaseOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", supplierId=" + getSupplierId() +
            ", totalAmount=" + getTotalAmount() +
            ", paymentType='" + getPaymentType() + "'" +
            ", orderStatus='" + getOrderStatus() + "'" +
            ", paymentStatus='" + getPaymentStatus() + "'" +
            ", shippingDate='" + getShippingDate() + "'" +
            ", shippingRequired='" + isShippingRequired() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
