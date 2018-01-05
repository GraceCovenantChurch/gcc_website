import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';

import Center from '../../components/Center';
import TitleBanner from '../../components/TitleBanner';
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
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Ministries.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/home/philly.jpg">
          <Center horizontal vertical>
            Ministries
          </Center>
        </TitleBanner>

        <div className="pageContent">
          {ministryList.map( (minName) => {
                  return (
                    <div className="ministryBox" key={minName}>
                      <Center vertical>{minName}</Center>
                    </div>
                  )
                })}
        </div>
      </div>
    );
  }
};

export default withTitle('Ministries')(Ministries);
