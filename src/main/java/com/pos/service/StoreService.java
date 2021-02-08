package com.pos.service;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.pos.domain.Employee;
import com.pos.domain.Store;
import com.pos.domain.dto.StoreDto;
import com.pos.repository.EmployeeRepository;
import com.pos.repository.StoreRepository;
import com.pos.security.SecurityUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public Store saveStore(StoreDto storeDto){

        Store store = new Store();
        BeanUtils.copyProperties(storeDto,store);

        Employee employee = employeeRepository.findById(storeDto.getManagedBy())
            .orElseThrow(()->new RuntimeException("Employee not found with id "+storeDto.getManagedBy()));

         store.setManagedBy(employee);
         store.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
         store.setCreatedBy(SecurityUtils.getCurrentUserLogin().get());
        return storeRepository.save(store);
    }

}
