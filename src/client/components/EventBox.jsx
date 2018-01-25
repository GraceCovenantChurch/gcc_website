import React, {Component} from 'react';
import classnames from 'classnames';
import Center from './Center'

import styles from './EventBox.css';

class EventBox extends Component {
    render() {
        return (
            <div className={styles.eventBox}>
                <Center vertical horizontal>
                    <div className={styles.eventName}>{this.props.eventName}</div>
                    <div className={styles.eventDate}>{this.props.eventDate}</div>
                </Center>
            </div>
        )
    }

};

export default EventBox;
