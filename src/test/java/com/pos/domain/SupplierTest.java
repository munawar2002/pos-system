package com.pos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class SupplierTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Supplier.class);
        Supplier supplier1 = new Supplier();
        supplier1.setId(1L);
        Supplier supplier2 = new Supplier();
        supplier2.setId(supplier1.getId());
        assertThat(supplier1).isEqualTo(supplier2);
        supplier2.setId(2L);
        assertThat(supplier1).isNotEqualTo(supplier2);
        supplier1.setId(null);
        assertThat(supplier1).isNotEqualTo(supplier2);
    }
}
