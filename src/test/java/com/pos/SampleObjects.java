package com.pos;

import com.pos.domain.Employee;
import com.pos.domain.ProductCategory;
import com.pos.domain.Supplier;
import com.pos.domain.dto.ProductDto;
import com.pos.domain.dto.StoreDto;
import com.pos.domain.enumeration.Designation;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class SampleObjects {

    public static Employee getEmployee() {
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

    public static ProductCategory getProductCategory() {
        return new ProductCategory()
            .name("Electronic")
            .creationDate(Timestamp.valueOf(LocalDateTime.now()));
    }

    public static Supplier getSupplier() {
        return new Supplier()
            .name("Dawlance")
            .address("Sample address")
            .contactNo("1213123")
            .contactPerson("Zubair Memon")
            .contactPersonNo("123344")
            .createdDate(Timestamp.valueOf(LocalDateTime.now()));
    }

    public static StoreDto getStoreDto() {
        StoreDto storeDto = new StoreDto();
        storeDto.setName("Store1");
        storeDto.setAddress("Sample address");
        storeDto.setManagedBy(1);
        return storeDto;
    }

    public static ProductDto getProductDto() {
        ProductDto productDto = new ProductDto();
        productDto.setName("Product1");
        productDto.setSupplierId(1L);
        productDto.setCategoryId(1);
        productDto.setBuyPrice(330d);
        productDto.setCode("abc1");
        productDto.setSellPrice(555d);
        return productDto;
    }
}
