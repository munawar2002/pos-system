package com.pos.domain.dto;

import java.sql.Timestamp;

public class StoreDto {

    private Long id;
    private String name;
    private String address;
    private long managedBy;
    private boolean active = true;
    private String createdBy;
    private Timestamp createdDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getManagedBy() {
        return managedBy;
    }

    public void setManagedBy(long managedBy) {
        this.managedBy = managedBy;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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
}
