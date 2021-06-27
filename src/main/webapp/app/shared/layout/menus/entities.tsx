import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/product-category">
      Product Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/employee">
      Employee
    </MenuItem>
    <MenuItem icon="asterisk" to="/store">
      Store
    </MenuItem>
    <MenuItem icon="asterisk" to="/supplier">
      Supplier
    </MenuItem>
    <MenuItem icon="asterisk" to="/product">
      Product
    </MenuItem>
    <MenuItem icon="asterisk" to="/store-product">
      Store Product
    </MenuItem>
    <MenuItem icon="asterisk" to="/product-company">
      Product Company
    </MenuItem>
    <MenuItem icon="asterisk" to="/purchase-order">
      Purchase Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/purchase-order-breakdown">
      Purchase Order Breakdown
    </MenuItem>
    <MenuItem icon="asterisk" to="/purchase-invoice">
      Purchase Invoice
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
