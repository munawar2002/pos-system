import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStoreProduct, defaultValue } from 'app/shared/model/store-product.model';

export const ACTION_TYPES = {
  FETCH_STOREPRODUCT_LIST: 'storeProduct/FETCH_STOREPRODUCT_LIST',
  FETCH_STOREPRODUCT: 'storeProduct/FETCH_STOREPRODUCT',
  CREATE_STOREPRODUCT: 'storeProduct/CREATE_STOREPRODUCT',
  UPDATE_STOREPRODUCT: 'storeProduct/UPDATE_STOREPRODUCT',
  DELETE_STOREPRODUCT: 'storeProduct/DELETE_STOREPRODUCT',
  RESET: 'storeProduct/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStoreProduct>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type StoreProductState = Readonly<typeof initialState>;

// Reducer

export default (state: StoreProductState = initialState, action): StoreProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STOREPRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STOREPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STOREPRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_STOREPRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_STOREPRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_STOREPRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STOREPRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_STOREPRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_STOREPRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_STOREPRODUCT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STOREPRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STOREPRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STOREPRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_STOREPRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STOREPRODUCT):
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

const apiUrl = 'api/store-products';

// Actions

export const getEntities: ICrudGetAllAction<IStoreProduct> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STOREPRODUCT_LIST,
  payload: axios.get<IStoreProduct>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IStoreProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STOREPRODUCT,
    payload: axios.get<IStoreProduct>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IStoreProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STOREPRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStoreProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STOREPRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStoreProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STOREPRODUCT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
