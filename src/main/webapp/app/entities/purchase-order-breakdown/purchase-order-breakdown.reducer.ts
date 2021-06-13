import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPurchaseOrderBreakdown, defaultValue } from 'app/shared/model/purchase-order-breakdown.model';

export const ACTION_TYPES = {
  FETCH_PURCHASEORDERBREAKDOWN_LIST: 'purchaseOrderBreakdown/FETCH_PURCHASEORDERBREAKDOWN_LIST',
  FETCH_PURCHASEORDERBREAKDOWN: 'purchaseOrderBreakdown/FETCH_PURCHASEORDERBREAKDOWN',
  CREATE_PURCHASEORDERBREAKDOWN: 'purchaseOrderBreakdown/CREATE_PURCHASEORDERBREAKDOWN',
  UPDATE_PURCHASEORDERBREAKDOWN: 'purchaseOrderBreakdown/UPDATE_PURCHASEORDERBREAKDOWN',
  DELETE_PURCHASEORDERBREAKDOWN: 'purchaseOrderBreakdown/DELETE_PURCHASEORDERBREAKDOWN',
  RESET: 'purchaseOrderBreakdown/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPurchaseOrderBreakdown>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PurchaseOrderBreakdownState = Readonly<typeof initialState>;

// Reducer

export default (state: PurchaseOrderBreakdownState = initialState, action): PurchaseOrderBreakdownState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PURCHASEORDERBREAKDOWN):
    case REQUEST(ACTION_TYPES.UPDATE_PURCHASEORDERBREAKDOWN):
    case REQUEST(ACTION_TYPES.DELETE_PURCHASEORDERBREAKDOWN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN):
    case FAILURE(ACTION_TYPES.CREATE_PURCHASEORDERBREAKDOWN):
    case FAILURE(ACTION_TYPES.UPDATE_PURCHASEORDERBREAKDOWN):
    case FAILURE(ACTION_TYPES.DELETE_PURCHASEORDERBREAKDOWN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PURCHASEORDERBREAKDOWN):
    case SUCCESS(ACTION_TYPES.UPDATE_PURCHASEORDERBREAKDOWN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PURCHASEORDERBREAKDOWN):
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

const apiUrl = 'api/purchase-order-breakdowns';

// Actions

export const getEntities: ICrudGetAllAction<IPurchaseOrderBreakdown> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN_LIST,
  payload: axios.get<IPurchaseOrderBreakdown>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPurchaseOrderBreakdown> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PURCHASEORDERBREAKDOWN,
    payload: axios.get<IPurchaseOrderBreakdown>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPurchaseOrderBreakdown> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PURCHASEORDERBREAKDOWN,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPurchaseOrderBreakdown> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PURCHASEORDERBREAKDOWN,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPurchaseOrderBreakdown> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PURCHASEORDERBREAKDOWN,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
