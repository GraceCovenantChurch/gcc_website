import React, {Component} from 'react';
import classnames from 'classnames';
import Center from './Center'
const styles = (typeof CSS !== 'undefined') && require('./EventBox.css');

class EventBox extends Component {
    render() {
        return(
            <div className="eventBox">
                <Center vertical horizontal>
                    <div className="eventName">{this.props.eventName}</div>
                    <div className="eventDate">{this.props.eventDate}</div>
                </Center>
            </div>
        )
    }

  };
  
  export default EventBox;