import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPurchaseInvoice, defaultValue } from 'app/shared/model/purchase-invoice.model';

export const ACTION_TYPES = {
  FETCH_PURCHASEINVOICE_LIST: 'purchaseInvoice/FETCH_PURCHASEINVOICE_LIST',
  FETCH_PURCHASEINVOICE: 'purchaseInvoice/FETCH_PURCHASEINVOICE',
  CREATE_PURCHASEINVOICE: 'purchaseInvoice/CREATE_PURCHASEINVOICE',
  UPDATE_PURCHASEINVOICE: 'purchaseInvoice/UPDATE_PURCHASEINVOICE',
  DELETE_PURCHASEINVOICE: 'purchaseInvoice/DELETE_PURCHASEINVOICE',
  RESET: 'purchaseInvoice/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPurchaseInvoice>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PurchaseInvoiceState = Readonly<typeof initialState>;

// Reducer

export default (state: PurchaseInvoiceState = initialState, action): PurchaseInvoiceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEINVOICE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEINVOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PURCHASEINVOICE):
    case REQUEST(ACTION_TYPES.UPDATE_PURCHASEINVOICE):
    case REQUEST(ACTION_TYPES.DELETE_PURCHASEINVOICE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEINVOICE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEINVOICE):
    case FAILURE(ACTION_TYPES.CREATE_PURCHASEINVOICE):
    case FAILURE(ACTION_TYPES.UPDATE_PURCHASEINVOICE):
    case FAILURE(ACTION_TYPES.DELETE_PURCHASEINVOICE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEINVOICE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEINVOICE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PURCHASEINVOICE):
    case SUCCESS(ACTION_TYPES.UPDATE_PURCHASEINVOICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PURCHASEINVOICE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/purchase-invoices';

// Actions

export const getEntities: ICrudGetAllAction<IPurchaseInvoice> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PURCHASEINVOICE_LIST,
  payload: axios.get<IPurchaseInvoice>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPurchaseInvoice> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PURCHASEINVOICE,
    payload: axios.get<IPurchaseInvoice>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPurchaseInvoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PURCHASEINVOICE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPurchaseInvoice> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PURCHASEINVOICE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPurchaseInvoice> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PURCHASEINVOICE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
