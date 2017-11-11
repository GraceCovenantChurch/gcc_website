
const initialState = {
  title: 'Grace Covenant Church',
};

export const SET_TITLE = 'SET_TITLE';

export default function metadata(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      return Object.assign({}, state, { title: action.title });

    default:
      return state;
  }
}

export const setTitle = title => dispatch => dispatch({
  type: SET_TITLE,
  title: [title, 'Grace Covenant Church'].filter(v => v).join(' - '),
});

