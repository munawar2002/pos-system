package com.pos;

import com.pos.domain.Employee;
import com.pos.domain.ProductCategory;
import com.pos.domain.enumeration.Designation;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class SampleObjects {

    public static Employee getEmployee(){
        return new Employee()
            .firstName("Munawar")
            .lastName("Ali")
            .fullName("Munawar Ali")
            .address("Sample address")
            .designation(Designation.SALES_ASSOCIATE)
            .jhiUserId(1L)
            .mobileNo("12345678912")
            .createdDate(Timestamp.valueOf(LocalDateTime.now()));
    }

    public static ProductCategory getProductCategory(){
        return new ProductCategory()
            .name("Electronic")
            .creationDate(Timestamp.valueOf(LocalDateTime.now()));
    }

}
