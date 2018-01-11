import path from 'path';
import React, {Component} from 'react';
import asyncComponent from '../../client/hoc/asyncComponent';
import TextDisplay from '../components/displayFields/TextDisplay';
import TextField from '../components/editFields/TextField';

class MinistryDisplay extends Component {
  render() {
    const {datum, ...props} = this.props;
    return (
      <div className="card" {...props}>
        <div className="card-body">
          <h5 className="card-title">{datum.name}</h5>
        </div>
      </div>
    );
  }
};

class MinistryDisplayWrapper extends Component {
  render() {
    return <div className="card-columns">{this.props.children}</div>
  }
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
