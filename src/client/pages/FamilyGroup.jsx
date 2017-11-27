import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import Header from '../components/Header';

const styles = (typeof CSS !== 'undefined') && require('./FamilyGroup.css');

class FamilyGroup extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/FamilyGroup.bundle.css" />
        </Helmet>

        <Header image="/static/images/home/philly.jpg" text="Family Group">
        </Header>

        <div>
          This is where actual content will go 
        </div>
      </div>
    );
  }
};

export default withTitle('Family Group')(FamilyGroup);
