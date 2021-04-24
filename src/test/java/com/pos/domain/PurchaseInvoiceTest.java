package com.pos.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.pos.web.rest.TestUtil;

public class PurchaseInvoiceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PurchaseInvoice.class);
        PurchaseInvoice purchaseInvoice1 = new PurchaseInvoice();
        purchaseInvoice1.setId(1L);
        PurchaseInvoice purchaseInvoice2 = new PurchaseInvoice();
        purchaseInvoice2.setId(purchaseInvoice1.getId());
        assertThat(purchaseInvoice1).isEqualTo(purchaseInvoice2);
        purchaseInvoice2.setId(2L);
        assertThat(purchaseInvoice1).isNotEqualTo(purchaseInvoice2);
        purchaseInvoice1.setId(null);
        assertThat(purchaseInvoice1).isNotEqualTo(purchaseInvoice2);
    }
}
