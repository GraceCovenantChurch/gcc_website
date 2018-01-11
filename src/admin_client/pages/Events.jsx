import path from 'path';
import React, {Component} from 'react';
import moment from 'moment';
import asyncComponent from '../../client/hoc/asyncComponent';
import TextDisplay from '../components/displayFields/TextDisplay';
import BooleanDisplay from '../components/displayFields/BooleanDisplay';
import DateDisplay from '../components/displayFields/DateDisplay';
import TextField from '../components/editFields/TextField';
import DateField from '../components/editFields/DateField';
import BooleanField from '../components/editFields/BooleanField';
import classnames from 'classnames';

class EventDisplay extends Component {
  render() {
    const {datum, ...props} = this.props;
    return (
      <div className="card" {...props}>
        <div className={classnames('card-body', {
          'text-secondary': !datum.published,
        })}>
          <h5 className="card-title">{datum.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {datum.startDate ? <DateDisplay value={datum.startDate}/> : null}
            {datum.endDate ? ' - ' : null}
            {datum.endDate ? <DateDisplay value={datum.endDate}/> : null}
          </h6>
          <p className="card-text">{datum.content}</p>
          <a href={datum.link} className="card-link">{datum.link}</a>
          {datum.expiration ?
            <p className="card-text">
              <small className="text-muted">Expires <DateDisplay value={datum.expiration}/></small>
            </p>
          : null}
        </div>
      </div>
    );
  }
};

class EventDisplayWrapper extends Component {
  render() {
    return <div className="card-columns">{this.props.children}</div>
  }
};

export default class Events extends Component {

  componentWillMount() {
    this.ModelPage = asyncComponent(path.resolve(__dirname, './ModelPage'), () => import('./ModelPage'));
  }

  render() {
    return (
      <this.ModelPage
        modelName="Event"
        sort={(a, b) => moment(a.startDate) - moment(b.startDate)}
        modelFields={[
          {
            key: 'published',
            initialSize: '5%',
            displayComponent: BooleanDisplay,
            editorComponent: BooleanField,
          },
          {
            key: 'title',
            initialSize: '15%',
            displayComponent: TextDisplay,
            editorComponent: TextField,
          },
          {
            key: 'content',
            initialSize: '20%',
            displayComponent: TextDisplay,
            editorComponent: TextField,
          },
          {
            key: 'link',
            initialSize: '15%',
            displayComponent: TextDisplay,
            editorComponent: TextField,
          },
          {
            key: 'startDate',
            initialSize: '15%',
            displayComponent: DateDisplay,
            editorComponent: DateField,
          },
          {
            key: 'endDate',
            initialSize: '15%',
            displayComponent: DateDisplay,
            editorComponent: DateField,
          },
          {
            key: 'expiration',
            initialSize: '15%',
            displayComponent: DateDisplay,
            editorComponent: DateField,
          },
        ]}
        ModelDisplayWrapper={EventDisplayWrapper}
        ModelDisplay={EventDisplay}
      />
    );
  }
}
