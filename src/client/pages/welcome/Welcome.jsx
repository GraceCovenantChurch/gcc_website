import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../../hoc/withTitle';
import BackgroundImage from '../../components/BackgroundImage';
import Center from '../../components/Center';
import TitleBanner from '../../components/subpage/titlebanner/TitleBanner';
import Jumbotron from '../../components/Jumbotron';
import { SparkScroll } from '../../modules/spark.js';

const styles = (typeof CSS !== 'undefined') && require('./Welcome.css');

class Welcome extends Component {
  render() {
    return (
      <div id="welcome">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="public/assets/pages/welcome/Welcome.bundle.css" />
        </Helmet>

        <TitleBanner
          src="/static/images/welcome/welcome_background.jpg"
          display="Welcome!" />

        <div className="container pageContent">
          <div className="title" />
          <div className="verbiage">
            <p>Our doors are wide open to people from all backgrounds. Whether you are a spiritual seeker just beginning to ask questions about God or a committed Christian wanting to deepen your faith, Grace Covenant Church is a place you can call home and find spiritual help, hope, and encouragement. Wherever you are in your spiritual journey, we invite you to discover GCC—and discover for yourself God’s wonderful love and plan for your life!</p>
          </div>

          <div className="media">
            <iframe width="800" height="600" src="https://www.youtube.com/embed/5M8H4xhSPWc" frameborder="0" allowFullScreen="true"></iframe>
          </div>

          <div className="verbiage">
            <p>What makes us unique? It isn’t our beliefs. We affirm the same basic Christian doctrines that have been a part of the Church for hundreds of years. Rather, we are committed to presenting these truths in a practical, relevant, contemporary, and loving manner. Our desire is to introduce you to Jesus Christ and to help you grow and become a kingdom worker. We want to help you to become a kingdom worker who can influence the world around you with the love of Jesus Christ.</p>
            <br/> <br/>
            <p>Our church is comprised of a network of “family groups“; small group settings where honest friendships, Bible study, constant prayer, and compassionate care are emphasized. It is within these dynamic family groups where the core of our evangelism and discipleship take place. We invite you to become of a part of these contagious Christian communities that strive to influence and encourage one another.</p>
            <br/> <br/>
            <p>Again, whether you’re a spiritual seeker who’s just starting to ask questions about God, or a committed Christian who wants to sink the roots of your faith even deeper, you can find a home here at Grace Covenant Church.</p>
            <br/> <br/>
            <p>Our Sunday Services and Friday Night Large Groups are typically located at Meyerson Hall Room B-1, 3401 Walnut Street Philadelphia, PA 19104. We oftentimes meet at Ralston House, 3615 Chestnut Street Philadelphia, PA 19104, as well. Keep an eye out for Grace Covenant Church signs and our welcomers to find us!</p>
          </div>

          <br/> <br/>

          <div className="locations">
            <h2>You can visit us at the following locations</h2>
            <div className="col-sm-4 col-sm-offset-2">
              <div className="uc-locations">
                <h3><strong>University City</strong></h3>
                <h4>Sunday Services 11:00AM</h4>
                <h4>Friday Night Large Groups 7:30PM</h4>
                <br/>
                <h4>Meyerson Hall Room B-1</h4>
                <h4>3401 Walnut Street</h4>
                <h4>Philadelphia, PA 19104 </h4>
              </div>

              <div className="uc-map">

              </div>
            </div>

            <div className="col-sm-4">
              <div className="ml-locations">
                <h3><strong>Mainline</strong></h3>
                <h4>Sunday Services 9:00AM</h4>
                <br/>
                <h4>Location Name</h4>
                <h4>0000 Some Street</h4>
                <h4>City, PA 19104</h4>
              </div>

              <div className="ml-map">

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
};

export default withTitle()(Welcome);
