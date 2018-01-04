import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';

import Banner from '../../components/Banner';
import TableRow from '../../components/TableRow';

const styles = (typeof CSS !== 'undefined') && require('./Ministries.css');

class Ministries extends Component {

  render() {

    let ministryList = ['Diakonos', 'Evangelism', 'Finance', 'Graphics', 'Hospitality', 'Multimedia',
     'Overflow', 'Transportation', 'Worship', 'Welcoming', 'Web'];

    return (
      <div id="ministries">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/FamilyGroup.bundle.css" />
        </Helmet>

        <Banner src="/static/images/home/philly.jpg">
          Ministries
        </Banner>

        <div className="pageContent">
          {ministries.map( (minName) => {
                  return (
                    <div className="row" key={minName}>
                      
                    </div>
                  )
                })}
        </div>
      </div>
    );
  }
};

export default withTitle('Ministries')(Ministries);
