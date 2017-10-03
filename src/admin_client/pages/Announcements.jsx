import React, {Component} from 'react';
import {connect} from 'react-redux';
import TableView, {TableRow, TableCell} from '../components/TableView';
import withTitle from '../../client/hoc/withTitle';

var testData = new Array(10);
for (let i = 0; i < 10; ++i) {
  testData[i] = {
    _id: Math.random(),
    index: i,
    title: 'This is a title',
    link: 'http://google.com/',
    content: 'The quick brown fox jumped over the lazy dog.',
  };
};

class Announcements extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="pull-right">
            <button className="btn btn-primary">New</button>
          </div>
          <h1>Announcements</h1>
        </div>
        <TableView columns={[
          { key: 'index', initialSize: 5 },
          { key: 'published', initialSize: 5 },
          { key: 'image',initialSize: 50 },
          { key: 'title', initialSize: 20 },
          { key: 'link', initialSize: 20 },
          { key: 'expiration', initialSize: 20 },
          { key: 'content', initialSize: 200 },
        ]}>
          {testData.map(datum => (
            <TableRow key={datum._id}>
              {Object.keys(datum).map((key, i) => (
                <TableCell column={key} key={key}>{datum[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableView>
      </div>
    )
  }
};

export default connect(state => {
  return {
    Announcements: state.Announcements || [],
  }
}, dispatch => {
  return {
    fetchData() {
      // return dispatch(fetchData('Announcements'));
    }
  }
})(withTitle('Announcements')(Announcements));
