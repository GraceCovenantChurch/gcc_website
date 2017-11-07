import React, {Component} from 'react';
import Link from 'react-router-dom/Link';
import Helmet from 'react-helmet';
import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Center from '../components/Center';
import Jumbotron from '../components/Jumbotron';
import Event from '../components/Event';
import {SparkScroll} from '../modules/spark.js';

const styles = (typeof CSS !== 'undefined') && require('./Home.css');

const mainAnnouncements = [
  {
    _id: 0,
    title: 'Passion Conference',
    content: 'Content goes here',
    published: true,
    link: '/page',
    internalLink: true,
    startDate: '10-26-2017',
    endDate: '10-28-2017',
    expiration: '',
    tag: 'UC'
  },
  {
    _id: 1,
    title: 'Crossroad Fall Reflection Retreat',
    content: 'What a Son & Daughter Need from Their Father',
    published: true,
    link: '/page',
    internalLink: true,
    startDate: '10-07-2017',
    endDate: '',
    expiration: '10-27-2017',
    tag: 'ML'
  },
  {
    _id: 2,
    title: 'Other Important Event',
    content: 'Content goes here',
    published: true,
    link: '/page',
    internalLink: true,
    startDate: '10-07-2017',
    endDate: '',
    expiration: '10-27-2017',
    tag: 'ML'
  },
  {
    _id: 3,
    title: 'Other Important Event',
    content: 'Content goes here',
    published: true,
    link: '/page',
    internalLink: true,
    startDate: '10-07-2017',
    endDate: '',
    expiration: '10-27-2017',
    tag: 'ML'
  },
];

//memory verse schema
//i'm just using index 0 for now if we're forced to grab arrays, but if we can just get the first row, that'd work too and prob save time

const memoryVerse = [
  {
    verse: "I have said these things to you, that you may have peace. In this world you will have tribulation. But take heart; I have overcome the world.",
    ref: "John 16:33",
    month: 10,
    year: 2017, //not sure if we will save this every month, but i think it's a good idea
    image: '', // image
    color: 'black' //prob need to specify text color depending on image? 
  }
]

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>

        <Jumbotron style={{height: '100vh'}}>
          <BackgroundImage src="/static/images/home/philly.jpg" backgroundSize="cover" backgroundPosition="top left" backgroundAttachment="fixed"/>
            <div className="container">
              <SparkScroll.h1 
                className="bottomLeft" 
                style={{color: 'white'}}
                timeline={{
                  centerCenter: {opacity: 0},
                  bottomBottom: {opacity: 1}
                }}>
                  Grace Covenant Church
              </SparkScroll.h1>
            </div>
        </Jumbotron>

        <Jumbotron style={{height: '100vh'}}>
          <BackgroundImage src="/static/images/home/philly.jpg" backgroundSize="cover" backgroundPosition="top left" backgroundAttachment="fixed"/>
            <div className="container">
              <SparkScroll.h1 
                className="bottomLeft2" 
                style={{color: 'white'}}
                timeline={{
                  topCenter: {opacity: 1},
                  topBottom: {opacity: 0}
                }}>
                Raising up kingdom workers who are transformed by Christ to influence the world. <Link to="#" className="arrow"><i className="glyphicon glyphicon-arrow-right"></i></Link>
              </SparkScroll.h1>
            </div>
        </Jumbotron>

        <Jumbotron style={{height: '65vh'}}>
          <BackgroundImage backgroundColor="white"/>
            <Center horizontal vertical>
            <div className="container" style={ { color:"black"} }>
              <h1 id="joinUs">Join Us In Worship</h1>

              <div className="col-sm-4 col-sm-offset-2 joinCol">
                <h2><strong>Friday Night Live</strong></h2>

                <h3><strong>University City</strong> 7:30pm</h3>
                <h3>Meyerson Hall (34th & Walnut)</h3>
              </div>
              
              <div className="col-sm-4 joinCol">
                <h2><strong>Sunday Service</strong></h2>

                <h3><strong>University City</strong> 7:30pm</h3>
                <h3>Meyerson Hall (34th & Walnut)</h3>

                <h3><strong>Mainline </strong> 9:45am</h3>
                <h3>Agnes Irwin School</h3>
              </div>

            </div>
            </Center>
        </Jumbotron>

        <Jumbotron style={{height: '100vh'}}>
          <BackgroundImage src="/static/images/home/bros.jpg" backgroundSize="cover" backgroundPosition="top left"/>
            <div className="container">
              <h1 className="bottomLeft" style={{color: 'white', fontSize: '70px'}}>
                You haven't checked out GCC unless you've checked out our family groups. <i className="glyphicon glyphicon-arrow-right"></i>
              </h1>
            </div>
        </Jumbotron>

        <Jumbotron style={{height: '70vh'}}>
          <BackgroundImage backgroundColor="white"/>
            <Center horizontal vertical>
            <div className="container">
              <h1 style={{color: 'black', marginBottom: '30px'}}>Events</h1>

              <div className="events">
                {mainAnnouncements.map( (event, i, events ) => {
                  return (i % 2 == 1) ? null : (
                    <div className="row" key={event._id}>
                      <div className="col-sm-5 col-sm-offset-1">
                        <Event 
                          key={i} 
                          index={i} 
                          tag={event.tag} 
                          startDate={event.startDate} 
                          endDate={event.endDate} 
                          title={event.title} 
                          content={event.content}>
                        </Event>
                      </div>
                      <div className="col-sm-5">
                        <Event 
                          key={i + 1} 
                          index={i + 1} 
                          tag={events[i + 1].tag} 
                          startDate={events[i + 1].startDate} 
                          endDate={events[i + 1].endDate} 
                          title={events[i + 1].title} 
                          content={events[i + 1].content}>
                        </Event>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div>
                <Link to="/" className="moreEvents">More Events</Link>
              </div>
            </div>
            </Center>
        </Jumbotron>
        
        <Jumbotron style={{ height:"60vh" }}>
          <BackgroundImage src={memoryVerse[0].image} backgroundSize="cover" backgroundPosition="center" />
          <Center horizontal vertical>
            <div className="container" style={ { color: memoryVerse[0].color, width: "40vw" } }>
              <h2 className="memoryVerse">Memory Verse of the Month</h2>
              <h2 className="memoryVerse verse">
                "{memoryVerse[0].verse}"
              </h2>
              <h2 className="memoryVerse">{memoryVerse[0].ref}</h2>
            </div>
          </Center>
        </Jumbotron>
      </div>
    );
  }
};

export default withTitle()(Home);
