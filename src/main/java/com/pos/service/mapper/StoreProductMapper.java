package com.pos.service.mapper;


import com.pos.domain.*;
import com.pos.service.dto.StoreProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link StoreProduct} and its DTO {@link StoreProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface StoreProductMapper extends EntityMapper<StoreProductDTO, StoreProduct> {



    default StoreProduct fromId(Long id) {
        if (id == null) {
            return null;
        }
        StoreProduct storeProduct = new StoreProduct();
        storeProduct.setId(id);
        return storeProduct;
    }
}
