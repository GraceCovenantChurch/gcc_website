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
      />
    );
  }
}
