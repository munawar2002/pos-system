package com.pos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class PurchaseOrderBreakdownTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseOrderBreakdown.class);
        PurchaseOrderBreakdown purchaseOrderBreakdown1 = new PurchaseOrderBreakdown();
        purchaseOrderBreakdown1.setId(1L);
        PurchaseOrderBreakdown purchaseOrderBreakdown2 = new PurchaseOrderBreakdown();
        purchaseOrderBreakdown2.setId(purchaseOrderBreakdown1.getId());
        assertThat(purchaseOrderBreakdown1).isEqualTo(purchaseOrderBreakdown2);
        purchaseOrderBreakdown2.setId(2L);
        assertThat(purchaseOrderBreakdown1).isNotEqualTo(purchaseOrderBreakdown2);
        purchaseOrderBreakdown1.setId(null);
        assertThat(purchaseOrderBreakdown1).isNotEqualTo(purchaseOrderBreakdown2);
    }
}
