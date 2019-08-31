/* eslint react/no-unescaped-entities: 0 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["ISOtoDate"] }] */

import moment from 'moment-timezone';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import contentfulClient from '../modules/contentful';
import withTitle from '../hoc/withTitle';
import BackgroundImage from '../components/BackgroundImage';
import Jumbotron from '../components/Jumbotron';
import Banner from '../components/Banner';
import TileDeck from '../components/TileDeck';
import Lora from '../components/Lora';

import styles from './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memoryVerse: {},
      eventsList: [],
      sundayService: null,
      undergradFNL: null,
      crossroadFNL: null,
      readingPlan: {
        books: ['Loading'],
        today: 'Loading',
      },
    };
  }

  componentDidMount() {
    const yesterday = moment().subtract(1, 'days').toISOString();
    contentfulClient.getEntries({
      content_type: 'event',
      'fields.date[gte]': yesterday,
      limit: 3,
      order: 'fields.date',
    }).then((entries) => {
      const eventsList = entries.items.map((item) => {
        const imageComponent = (
          <img
            className={styles.image}
            src={item.fields.image.fields.file.url}
            alt={item.fields.image.fields.title}
          />
        );

        const contentComponent = (
          <div>
            <h4><strong>{item.fields.title}</strong></h4>
            <div className={styles.subtitle}>{moment(item.fields.date).calendar()}</div>
            <div className={styles.subtitle}>{item.fields.location}</div>
            <div className={styles.description}>{item.fields.description}</div>
            {item.fields.link &&
              (
                <a className={styles.link} href={item.fields.link}>
                  <Lora>Go to event page ></Lora>
                </a>
               )
            }
            {item.fields.file &&
              (
                <a className={styles.link} href={item.fields.file.fields.file.url}>
                  <Lora>View the file ></Lora>
                </a>
              )
            }
          </div>
        );

        return {
          imageComponent,
          contentComponent,
        };
      });

      this.setState({
        eventsList,
      });
    });

    contentfulClient.getEntries({
      content_type: 'memoryVerse',
      limit: 1,
      order: 'sys.createdAt',
    }).then((entries) => {
      this.setState({
        memoryVerse: entries.items[0].fields,
      });
    });

    contentfulClient.getEntries({
      content_type: 'services',
      order: 'fields.time',
    }).then((entries) => {
      const data = entries.items;

      data.forEach((element) => {
        const title = element.fields.title;
        const eventTime = element.fields.time;

        if (moment.tz(moment(), 'America/New_York').isBefore(eventTime)) {
          const { sundayService, undergradFNL, crossroadFNL } = this.state;

          if (title.includes('Sunday Service')) {
            if (sundayService) {
              const currentState = sundayService.time;
              const currentData = element.fields.time;

              if (!(currentState < currentData)) {
                this.setState({ sundayService: element.fields });
              }
            } else {
              this.setState({ sundayService: element.fields });
            }
          } else if (title.includes('College Friday Night Live')) {
            if (undergradFNL) {
              const currentState = undergradFNL.time;
              const currentData = element.fields.time;

              if (!(currentState < currentData)) {
                this.setState({ undergradFNL: element.fields });
              }
            } else {
              this.setState({ undergradFNL: element.fields });
            }
          } else if (title.includes('Young Adult Friday Night Live')) {
            if (crossroadFNL) {
              const currentState = crossroadFNL.time;
              const currentData = element.fields.time;

              if (!(currentState < currentData)) {
                this.setState({ crossroadFNL: element.fields });
              }
            } else {
              this.setState({ crossroadFNL: element.fields });
            }
          }
        }
      });
    });

    contentfulClient.getEntries({
      content_type: 'readingPlan',
      limit: 1,
      order: '-sys.createdAt',
    }).then((entries) => {
      let books = [];
      let sections = entries.items[0].fields.chapters.split('\n');
      sections = sections.map((section) => {
        const tokens = section.split(' ');
        let book;
        let range;
        if (!Number.isNaN(parseInt(tokens[0], 10))) {
          book = `${tokens[0]} ${tokens[1]}`;
          range = tokens[2];
        } else {
          book = tokens[0];
          range = tokens[1];
        }
        books.push(book);
        const start = parseInt(range.includes('-') ? range.substring(0, range.indexOf('-')) : range, 10);
        const end = parseInt(range.includes('-') ? range.substring(range.indexOf('-') + 1) : range, 10);
        return {
          book,
          start,
          end,
        };
      });
      books = books.filter((v, i) => books.indexOf(v) === i);

      // this algorithm could be improved by considering intervals rather than
      // iterating day by day.
      const today = (new Date()).getDate();
      let sectionsIdx = -1;
      let i = 1;
      let j = -1;
      while (i < today) {
        sectionsIdx++;
        j = sections[sectionsIdx].start;
        while (i < today && j <= sections[sectionsIdx].end) {
          i++;
          j++;
        }
      }
      if (sectionsIdx === -1) {
        sectionsIdx++;
        j = sections[sectionsIdx].start;
      }

      const readingPlan = {
        books,
        today: `${sections[sectionsIdx].book} ${j}`,
      };

      this.setState({ readingPlan });
    });
  }

  ISOtoDate(date) {
    const indate = new Date(date);
    let ampm = '';

    if (indate.getHours() > 12) {
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }

    const output = `${indate.getHours() % 12}:${indate.getMinutes() < 10 ? '0' : ''}${indate.getMinutes()} ${ampm}`;

    return output;
  }

  render() {
    const { sundayService, undergradFNL, crossroadFNL } = this.state;

    const titleSection = (
      <Jumbotron style={{ height: '100vh' }}>
        <BackgroundImage
          src="/static/images/home/worship.jpg"
          backgroundSize="cover"
          backgroundPosition="top left"
          backgroundAttachment="local"
        />
        <div className={styles.titleSection}>
          <div className={styles.titleSectionMission}>
            Raising up kingdom workers <br />
            who are transformed by Christ <br />
            to influence the world.
          </div>
          <a className={styles.titleSectionLink} href="/welcome">
            <Lora>Learn more ></Lora>
          </a>
        </div>
      </Jumbotron>
    );

    const infoSection = (
      <div className={styles.infoSection}>
        <div className={styles.infoSectionHeader}>
          <Lora>Service Locations and Times</Lora>
        </div>
        <div className={styles.infoSectionContent}>
          { undergradFNL &&
            <div>
              <div className={styles.infoSectionTimes}>
                { undergradFNL.title }<br />
                { this.ISOtoDate(undergradFNL.time) }
              </div>
              <div className={styles.infoSectionLocation}>
                { undergradFNL.location } <br />
                { undergradFNL.street } <br />
                { undergradFNL.citystatezip }
              </div>
            </div>
          }

          { !undergradFNL &&
            <div>
              <div className={styles.infoSectionTimes}>
                College Friday Night Live <br />
                7:30 PM
              </div>
              <div className={styles.infoSectionLocation}>
                Meyerson Hall <br />
                210 South 34th Street <br />
                Philadelphia, PA 19104
              </div>
            </div>
          }

          { sundayService &&
            <div>
              <div className={styles.infoSectionTimes}>
                { sundayService.title }<br />
                { this.ISOtoDate(sundayService.time) }
              </div>
              <div className={styles.infoSectionLocation}>
                { sundayService.location } <br />
                { sundayService.street } <br />
                { sundayService.citystatezip }
              </div>
            </div>
          }

          { !sundayService &&
            <div>
              <div className={styles.infoSectionTimes}>
                Sunday Service <br />
                11:30 AM
              </div>
              <div className={styles.infoSectionLocation}>
                Meyerson Hall<br />
                210 S 34th St <br />
                Philadelphia, PA 19104
              </div>
            </div>
          }

          { crossroadFNL &&
            <div>
              <div className={styles.infoSectionTimes}>
                { crossroadFNL.title }<br />
                { this.ISOtoDate(crossroadFNL.time) }
              </div>
              <div className={styles.infoSectionLocation}>
                { crossroadFNL.location } <br />
                { crossroadFNL.street } <br />
                { crossroadFNL.citystatezip }
              </div>
            </div>
          }

          { !crossroadFNL &&
            <div>
              <div className={styles.infoSectionTimes}>
                Young Adult Friday Night Live <br />
                7:00 PM
              </div>
              <div className={styles.infoSectionLocation}>
                Meyerson Hall <br />
                210 South 34th Street <br />
                Philadelphia, PA 19104
              </div>
            </div>
          }
        </div>
        <a className={styles.infoSectionLink} href="/welcome">
          <Lora>Learn more ></Lora>
        </a>
      </div>
    );

    const familyGroupSection = (
      <Banner src="/static/images/home/familygroup.jpg">
        <div className={styles.fgSection}>
          <div className={styles.titleSectionSubtitle}>
            <Lora>Community</Lora>
          </div>
          <div className={styles.fgSectionHeader}>
            Family Group
          </div>
          <div className={styles.fgSectionSubtitle}>
            You haven't checked out GCC unless <br />
            you've checked out our family groups.
          </div>
          <a className={styles.fgSectionLink} href="/familygroup">
            <Lora>Sign up here ></Lora>
          </a>
        </div>
      </Banner>
    );

    const amiSection = (
      <Banner src="/static/images/home/amiqt.jpg" centered>
        <table className={styles.readingSection}>
          <tbody>
            <tr>
              <td>
                <div className={styles.title}>
                  AMI Quiet Times
                </div>
              </td>
              <td>
                <div className={styles.title}>
                  Reading Plan
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={styles.download}>
                  <div>
                    <a href="https://itunes.apple.com/us/app/id651172729?mt=8&uo=4" target="_blank" rel="noopener noreferrer">
                      <img className={styles.downloadButton} alt="apple_download" src="/static/icon/apple_download.svg" />
                    </a>
                  </div>
                  <div>
                    <a href="https://amiquiettimes.com" target="_blank" rel="noopener noreferrer">
                      <img className={styles.downloadButton} alt="ami_qt_page" src="/static/icon/ami.png" />
                    </a>
                  </div>
                  <div>
                    <a href="https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.ami&referrer=utm_source%3Dsubsplash%26utm_content%3DeyJoYW5kbGVyIjoiYXBwIiwiYXBwa2V5IjoiNlZaSFZOIn0=" target="_blank" rel="noopener noreferrer">
                      <img className={styles.downloadButton} alt="google_download" src="/static/icon/google_download.png" />
                    </a>
                  </div>
                </div>
              </td>
              <td>
                <div className={styles.subtitle}>
                  This Month: {this.state.readingPlan.books.join(', ')}
                  <br />
                  Today: {this.state.readingPlan.today}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Banner>
    );

    const memoryVerseSection = (
      <div className={styles.emptySection}>
        <div className={styles.title}>
          <Lora>Monthly Memory Verse</Lora>
        </div>
        <div className={styles.memoryVerse}>
          {this.state.memoryVerse.verseText}
        </div>
        <div className={styles.footerText}>
          <Lora>{this.state.memoryVerse.verseReference || ''}</Lora>
        </div>
      </div>
    );

    let events = null;

    if (this.state.eventsList.length !== 0) {
      events = (
        <TileDeck
          data={this.state.eventsList}
        />
      );
    } else {
      events = (
        <div className={styles.eventSectionEventsError}>
          There seems to be no upcoming events
        </div>
      );
    }

    const eventSection = (
      <div className={styles.eventSection}>
        <div className={styles.eventSectionSubtitle}>
          <Lora>Upcoming Events</Lora>
        </div>
        <div className={styles.eventsContainer}>{events}</div>
        <a className={styles.eventSectionSubtitle} href="/events">
          <Lora>See all events ></Lora>
        </a>
      </div>
    );

    return (
      <div id="home" className={styles.home}>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/pages/Home.bundle.css" />
        </Helmet>
        {titleSection}
        {infoSection}
        {familyGroupSection}
        {eventSection}
        {amiSection}
        {memoryVerseSection}
      </div>
    );
  }
}

const HomePage = compose(
  withTitle(),
  withRouter,
)(Home);

export default HomePage;
