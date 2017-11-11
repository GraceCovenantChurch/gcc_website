import React, {Component} from 'react';
import classnames from 'classnames';
const styles = (typeof CSS !== 'undefined') && require('./Event.css');

class Event extends Component {
    render() {
        return(
            <div className="card">
                <div className="tag">{this.props.tag}</div>
                <div className="dates">{this.props.startDate} {this.props.endDate && <span>-</span>} {this.props.endDate}</div>
                <div className="title">{this.props.title}</div>
                <div className="content">{this.props.content}</div>
            </div>
        )
    }

  };
  
  export default Event;