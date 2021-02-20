package com.pos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class ProductCompanyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductCompany.class);
        ProductCompany productCompany1 = new ProductCompany();
        productCompany1.setId(1L);
        ProductCompany productCompany2 = new ProductCompany();
        productCompany2.setId(productCompany1.getId());
        assertThat(productCompany1).isEqualTo(productCompany2);
        productCompany2.setId(2L);
        assertThat(productCompany1).isNotEqualTo(productCompany2);
        productCompany1.setId(null);
        assertThat(productCompany1).isNotEqualTo(productCompany2);
    }
}
