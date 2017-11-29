import fetch from 'isomorphic-fetch';
import nconf from 'nconf';

const initialState = {
  title: '',
  content: '',
};

export const PAGE_LOADED = 'PAGE_LOADED';

export default function page(state = initialState, action) {
  switch (action.type) {
    case PAGE_LOADED:
      return Object.assign({}, state, {
        title: action.title,
        content: action.content,
      });

    default:
      return state;
  }
}

export const fetchPage = pageName => (dispatch) => {
  const SERVER_HOST = nconf.get('SERVER_HOST');
  return fetch(`http://${SERVER_HOST}/api/pages/${pageName}`)
    .then(res => res.json())
    .then(({ title, content }) => dispatch({
      type: PAGE_LOADED,
      title,
      content,
    }));
};
