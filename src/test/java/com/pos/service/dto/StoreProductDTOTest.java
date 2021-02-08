package com.pos.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class StoreProductDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreProductDTO.class);
        StoreProductDTO storeProductDTO1 = new StoreProductDTO();
        storeProductDTO1.setId(1L);
        StoreProductDTO storeProductDTO2 = new StoreProductDTO();
        assertThat(storeProductDTO1).isNotEqualTo(storeProductDTO2);
        storeProductDTO2.setId(storeProductDTO1.getId());
        assertThat(storeProductDTO1).isEqualTo(storeProductDTO2);
        storeProductDTO2.setId(2L);
        assertThat(storeProductDTO1).isNotEqualTo(storeProductDTO2);
        storeProductDTO1.setId(null);
        assertThat(storeProductDTO1).isNotEqualTo(storeProductDTO2);
    }
}
