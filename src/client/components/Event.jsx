import React, {Component} from 'react';
import classnames from 'classnames';
import styles from './Event.css';

class Event extends Component {
    render() {
        return(
            <div className={styles.card}>
                <div className={styles.tag}>{this.props.tag}</div>
                <div className={styles.date}>{this.props.startDate} {this.props.endDate && <span>-</span>} {this.props.endDate}</div>
                <div className={styles.title}>{this.props.title}</div>
                <div className={styles.content}>{this.props.content}</div>
            </div>
        )
    }

  };

  export default Event;
