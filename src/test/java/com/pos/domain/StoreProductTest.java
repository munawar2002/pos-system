package com.pos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class StoreProductTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StoreProduct.class);
        StoreProduct storeProduct1 = new StoreProduct();
        storeProduct1.setId(1L);
        StoreProduct storeProduct2 = new StoreProduct();
        storeProduct2.setId(storeProduct1.getId());
        assertThat(storeProduct1).isEqualTo(storeProduct2);
        storeProduct2.setId(2L);
        assertThat(storeProduct1).isNotEqualTo(storeProduct2);
        storeProduct1.setId(null);
        assertThat(storeProduct1).isNotEqualTo(storeProduct2);
    }
}
