import fetch from 'isomorphic-fetch';
import pluralize from 'pluralize';
import nconf from 'nconf';

export const MODEL_DATA_LOADED = 'MODEL_DATA_LOADED';

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

    default:
      return state;
  }
}

export default function page(state = initialState, action) {
  switch (action.type) {
    case MODEL_DATA_LOADED:
    {
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
  const PUBLIC_SERVER_HOST = nconf.get('PUBLIC_SERVER_HOST');
  return fetch(`http://${PUBLIC_SERVER_HOST}/api/modelData/${pluralize(modelName)}`, {
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
