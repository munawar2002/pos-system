package com.pos.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;

import com.pos.domain.enumeration.PaymentType;

import com.pos.domain.enumeration.OrderStatus;

/**
 * A PurchaseInvoice.
 */
@Entity
@Table(name = "purchase_invoice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchaseInvoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private PaymentType paymentType;

    @Column(name = "purchase_order_id")
    private Long purchaseOrderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "invoice_status")
    private OrderStatus invoiceStatus;

    @Column(name = "paid_amount")
    private Double paidAmount;

    @Column(name = "total_amount")
    private Long totalAmount;

    @Column(name = "tendered_amount")
    private Double tenderedAmount;

    @Column(name = "discount_availed")
    private Boolean discountAvailed;

    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    @Column(name = "discount_amount")
    private Double discountAmount;

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

    public PurchaseInvoice supplier(Supplier supplier) {
        this.supplier = supplier;
        return this;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public PurchaseInvoice paymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public Long getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public PurchaseInvoice purchaseOrderId(Long purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
        return this;
    }

    public void setPurchaseOrderId(Long purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public OrderStatus getInvoiceStatus() {
        return invoiceStatus;
    }

    public PurchaseInvoice invoiceStatus(OrderStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
        return this;
    }

    public void setInvoiceStatus(OrderStatus invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public PurchaseInvoice paidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
        return this;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public PurchaseInvoice totalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
        return this;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Double getTenderedAmount() {
        return tenderedAmount;
    }

    public PurchaseInvoice tenderedAmount(Double tenderedAmount) {
        this.tenderedAmount = tenderedAmount;
        return this;
    }

    public void setTenderedAmount(Double tenderedAmount) {
        this.tenderedAmount = tenderedAmount;
    }

    public Boolean isDiscountAvailed() {
        return discountAvailed;
    }

    public PurchaseInvoice discountAvailed(Boolean discountAvailed) {
        this.discountAvailed = discountAvailed;
        return this;
    }

    public void setDiscountAvailed(Boolean discountAvailed) {
        this.discountAvailed = discountAvailed;
    }

    public Integer getDiscountPercentage() {
        return discountPercentage;
    }

    public PurchaseInvoice discountPercentage(Integer discountPercentage) {
        this.discountPercentage = discountPercentage;
        return this;
    }

    public void setDiscountPercentage(Integer discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public PurchaseInvoice discountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
        return this;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public PurchaseInvoice createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Timestamp getCreatedDate() {
        return createdDate;
    }

    public PurchaseInvoice createdDate(Timestamp createdDate) {
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
        if (!(o instanceof PurchaseInvoice)) {
            return false;
        }
        return id != null && id.equals(((PurchaseInvoice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        String supplierName = "";
        if(getSupplier() != null){
            supplierName = getSupplier().getName();
        }
        return "PurchaseInvoice{" +
            "id=" + getId() +
            ", supplierName=" + supplierName +
            ", paymentType='" + getPaymentType() + "'" +
            ", purchaseOrderId=" + getPurchaseOrderId() +
            ", invoiceStatus='" + getInvoiceStatus() + "'" +
            ", paidAmount=" + getPaidAmount() +
            ", totalAmount=" + getTotalAmount() +
            ", tenderedAmount=" + getTenderedAmount() +
            ", discountAvailed='" + isDiscountAvailed() + "'" +
            ", discountPercentage=" + getDiscountPercentage() +
            ", discountAmount=" + getDiscountAmount() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            "}";
    }
}
