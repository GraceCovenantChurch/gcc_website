
const initialState = {};

export const POST_NOTIFICATION = 'POST_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const WARNING = 'WARNING';
export const INFO = 'INFO';
export const DANGER = 'DANGER';

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case POST_NOTIFICATION:
      return Object.assign({}, state, {
        [action.key]: {
          status: action.status,
          message: action.message,
        },
      });

    case CLEAR_NOTIFICATION:
      return (() => {
        const s = Object.assign({}, state);
        delete s[action.key];
        return s;
      })();

    default:
      return state;
  }
}

let KEY = 0;

export function postNotification(status, message) {
  return {
    type: POST_NOTIFICATION,
    key: KEY++,
    status,
    message,
  };
}

export function clearNotification(key) {
  return {
    type: CLEAR_NOTIFICATION,
    key,
  };
}
