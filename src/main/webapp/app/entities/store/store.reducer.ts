import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStore, defaultValue } from 'app/shared/model/store.model';

export const ACTION_TYPES = {
  FETCH_STORE_LIST: 'store/FETCH_STORE_LIST',
  FETCH_STORE: 'store/FETCH_STORE',
  CREATE_STORE: 'store/CREATE_STORE',
  UPDATE_STORE: 'store/UPDATE_STORE',
  DELETE_STORE: 'store/DELETE_STORE',
  RESET: 'store/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStore>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type StoreState = Readonly<typeof initialState>;

// Reducer

export default (state: StoreState = initialState, action): StoreState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STORE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STORE):
    case REQUEST(ACTION_TYPES.UPDATE_STORE):
    case REQUEST(ACTION_TYPES.DELETE_STORE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_STORE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STORE):
    case FAILURE(ACTION_TYPES.CREATE_STORE):
    case FAILURE(ACTION_TYPES.UPDATE_STORE):
    case FAILURE(ACTION_TYPES.DELETE_STORE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STORE):
    case SUCCESS(ACTION_TYPES.UPDATE_STORE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STORE):
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

const apiUrl = 'api/stores';

// Actions

export const getEntities: ICrudGetAllAction<IStore> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STORE_LIST,
  payload: axios.get<IStore>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IStore> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STORE,
    payload: axios.get<IStore>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IStore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STORE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStore> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STORE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStore> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STORE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
