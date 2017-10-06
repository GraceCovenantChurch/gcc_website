import path from 'path';
import React, {Component} from 'react';
import asyncComponent from '../../client/hoc/asyncComponent';

export default class Announcements extends Component {

  componentWillMount() {
    this.ModelPage = asyncComponent(path.resolve(__dirname, './ModelPage'), () => import('./ModelPage'));
  }

  render() {
    return <this.ModelPage modelName="Announcement" modelFields={[
      { key: 'index', initialSize: '10%' },
      { key: 'published', initialSize: '10%' },
      { key: 'image',initialSize: '10%' },
      { key: 'title', initialSize: '10%' },
      { key: 'link', initialSize: '10%' },
      { key: 'expiration', initialSize: '10%' },
      { key: 'content', initialSize: '40%' },
    ]}/>
  }
}
