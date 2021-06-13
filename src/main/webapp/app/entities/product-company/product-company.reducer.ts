import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProductCompany, defaultValue } from 'app/shared/model/product-company.model';

export const ACTION_TYPES = {
  FETCH_PRODUCTCOMPANY_LIST: 'productCompany/FETCH_PRODUCTCOMPANY_LIST',
  FETCH_PRODUCTCOMPANY: 'productCompany/FETCH_PRODUCTCOMPANY',
  CREATE_PRODUCTCOMPANY: 'productCompany/CREATE_PRODUCTCOMPANY',
  UPDATE_PRODUCTCOMPANY: 'productCompany/UPDATE_PRODUCTCOMPANY',
  DELETE_PRODUCTCOMPANY: 'productCompany/DELETE_PRODUCTCOMPANY',
  RESET: 'productCompany/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductCompany>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProductCompanyState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductCompanyState = initialState, action): ProductCompanyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTCOMPANY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTCOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTCOMPANY):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTCOMPANY):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTCOMPANY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTCOMPANY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTCOMPANY):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTCOMPANY):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTCOMPANY):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTCOMPANY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTCOMPANY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTCOMPANY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTCOMPANY):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTCOMPANY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTCOMPANY):
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

const apiUrl = 'api/product-companies';

// Actions

export const getEntities: ICrudGetAllAction<IProductCompany> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTCOMPANY_LIST,
  payload: axios.get<IProductCompany>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProductCompany> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTCOMPANY,
    payload: axios.get<IProductCompany>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProductCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTCOMPANY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductCompany> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTCOMPANY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductCompany> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTCOMPANY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
