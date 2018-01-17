import fetch from 'isomorphic-fetch';
import pluralize from 'pluralize';

export const MODEL_DATA_LOADED = 'MODEL_DATA_LOADED';
export const DOCUMENT_CREATED = 'DOCUMENT_CREATED';
export const DOCUMENT_UPDATED = 'DOCUMENT_UPDATED';
export const DOCUMENT_DELETED = 'DOCUMENT_DELETED';

const initialState = {};
const initialModelState = {
  __DB__: {},
  ids: [],
};

function model(state = initialModelState, action) {
  const DB = Object.assign({}, state.__DB__);

  switch (action.type) {
    case MODEL_DATA_LOADED:
      action.data.forEach((datum) => {
        Object.assign(DB, {
          [datum._id]: datum,
        });
      });

      return Object.assign({}, state, {
        __DB__: DB,
        ids: action.data.map(datum => datum._id),
      });

    case DOCUMENT_CREATED:
      return Object.assign({}, state, {
        __DB__: Object.assign({}, state.__DB__, {
          [action.data._id]: action.data,
        }),
        ids: [...state.ids, action.data._id],
      });

    case DOCUMENT_UPDATED:
      return Object.assign({}, state, {
        __DB__: Object.assign({}, state.__DB__, {
          [action.id]: action.data,
        }),
      });

    case DOCUMENT_DELETED:
      return Object.assign({}, state, {
        __DB__: Object.assign({}, state.__DB__, {
          [action.id]: undefined,
        }),
        ids: state.ids.filter(id => id !== action.id),
      });

    default:
      return state;
  }
}

export default function page(state = initialState, action) {
  switch (action.type) {
    case MODEL_DATA_LOADED:
    case DOCUMENT_CREATED:
    case DOCUMENT_UPDATED:
    case DOCUMENT_DELETED: {
      const key = pluralize(action.modelName);
      return Object.assign({}, state, {
        [key]: model(state[key], action),
      });
    }

    default:
      return state;
  }
}

function handleErrors(res) {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return Promise.resolve(res);
}

export const fetchModelData = modelName => (dispatch) => {
  const SERVER_HOST = 'localhost:8080';
  return fetch(`http://${SERVER_HOST}/api/modelData/${pluralize(modelName)}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(handleErrors)
    .then(res => res.json())
    .then(data => dispatch({
      type: MODEL_DATA_LOADED,
      modelName,
      data,
    }));
};
