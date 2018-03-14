import path from 'path';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asyncComponent from '../../client/hoc/asyncComponent';
import TextDisplay from '../components/displayFields/TextDisplay';
import TextField from '../components/editFields/TextField';

const MinistryDisplay = ({ datum, ...props }) => (
  <div className="card" {...props}>
    <div className="card-body">
      <h5 className="card-title">{datum.name}</h5>
    </div>
  </div>
);

MinistryDisplay.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  datum: PropTypes.object.isRequired,
};

const MinistryDisplayWrapper = ({ children }) => <div className="card-columns">{children}</div>;

MinistryDisplayWrapper.propTypes = {
  children: PropTypes.node,
};

MinistryDisplayWrapper.defaultProps = {
  children: null,
};

export default class Ministries extends Component {
  componentWillMount() {
    this.ModelPage = asyncComponent(path.resolve(__dirname, './ModelPage'), () => import('./ModelPage'));
  }

  render() {
    return (
      <this.ModelPage
        modelName="Ministry"
        sort={(a, b) => (a.name || '').localeCompare(b.name)}
        modelFields={[
          {
            key: 'name',
            initialSize: '100%',
            displayComponent: TextDisplay,
            editorComponent: TextField,
          },
        ]}
        ModelDisplayWrapper={MinistryDisplayWrapper}
        ModelDisplay={MinistryDisplay}
      />
    );
  }
}
