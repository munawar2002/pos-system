package com.pos.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class StoreProductMapperTest {

    private StoreProductMapper storeProductMapper;

    @BeforeEach
    public void setUp() {
        storeProductMapper = new StoreProductMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(storeProductMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(storeProductMapper.fromId(null)).isNull();
    }
}
