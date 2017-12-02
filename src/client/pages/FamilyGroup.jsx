import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import TitleBanner from '../components/TitleBanner';

const styles = (typeof CSS !== 'undefined') && require('./FamilyGroup.css');

class FamilyGroup extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/FamilyGroup.bundle.css" />
        </Helmet>

        <TitleBanner src="/static/images/home/philly.jpg" display="Family Group"></TitleBanner>

        <div className="pageContent">
          This is where actual content will go 
        </div>
      </div>
    );
  }
};

export default withTitle('Family Group')(FamilyGroup);
