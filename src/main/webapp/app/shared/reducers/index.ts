import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import productCategory, {
  ProductCategoryState
} from 'app/entities/product-category/product-category.reducer';
// prettier-ignore
import employee, {
  EmployeeState
} from 'app/entities/employee/employee.reducer';
// prettier-ignore
import store, {
  StoreState
} from 'app/entities/store/store.reducer';
// prettier-ignore
import supplier, {
  SupplierState
} from 'app/entities/supplier/supplier.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product.reducer';
// prettier-ignore
import storeProduct, {
  StoreProductState
} from 'app/entities/store-product/store-product.reducer';
// prettier-ignore
import productCompany, {
  ProductCompanyState
} from 'app/entities/product-company/product-company.reducer';
// prettier-ignore
import purchaseOrder, {
  PurchaseOrderState
} from 'app/entities/purchase-order/purchase-order.reducer';
// prettier-ignore
import purchaseOrderBreakdown, {
  PurchaseOrderBreakdownState
} from 'app/entities/purchase-order-breakdown/purchase-order-breakdown.reducer';
// prettier-ignore
import purchaseInvoice, {
  PurchaseInvoiceState
} from 'app/entities/purchase-invoice/purchase-invoice.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly productCategory: ProductCategoryState;
  readonly employee: EmployeeState;
  readonly store: StoreState;
  readonly supplier: SupplierState;
  readonly product: ProductState;
  readonly storeProduct: StoreProductState;
  readonly productCompany: ProductCompanyState;
  readonly purchaseOrder: PurchaseOrderState;
  readonly purchaseOrderBreakdown: PurchaseOrderBreakdownState;
  readonly purchaseInvoice: PurchaseInvoiceState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  productCategory,
  employee,
  store,
  supplier,
  product,
  storeProduct,
  productCompany,
  purchaseOrder,
  purchaseOrderBreakdown,
  purchaseInvoice,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
