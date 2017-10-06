import React, {Component} from 'react';
import {connect} from 'react-redux';
import pluralize from 'pluralize';
import {createDocument, updateDocument, deleteDocument} from '../modules/modelData';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.document || {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.document || {});
  }

  hasChanges() {
    var changed = false;
    Object.keys(this.state).forEach(key => {
      if (this.state[key] !== this.props.document[key]) {
        changed = true;
      }
    });
    return changed;
  }

  handleCancel(e) {
    return (
      (!this.hasChanges() || confirm('Are you sure you want to cancel?')) &&
      this.props.onClose &&
      this.props.onClose()
    );
  }

  handleDelete(e) {
    return this.props.delete()
    .then(this.props.onClose)
    .catch(err => console.error(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    return (this.props.id ?
      this.props.update(this.state) :
      this.props.create(this.state)
    ).then(this.props.onClose)
    .catch(err => console.error(err));
  }

  render() {
    const document = this.props.document || {};
    return (
      <form className="form" key={this.props.id && this.props.document} onSubmit={this.handleSubmit.bind(this)}>
        {this.props.fields.map(field => (
          <div key={field.key} className="form-group">
            <label htmlFor={field.key}>{field.key}</label>
            <input type="text" className="form-control" placeholder={field.key}

              value={this.state[field.key] || ''}
              onChange={e => {
                this.setState({
                  [field.key]: e.target.value,
                });
              }}
            />
          </div>
        ))}
        <div className="btn-toolbar">
          <a disabled={!this.props.id} className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</a>
          <a className="btn btn-default" onClick={this.handleCancel.bind(this)}>Cancel</a>
          <button className="btn btn-primary pull-right" type="submit">Save</button>
        </div>
      </form>
    );
  }
}

export default connect((state, ownProps) => {
  const modelData = state.modelData[pluralize(ownProps.modelName)];
  return {
    document: modelData && modelData.__DB__[ownProps.id],
  };
}, (dispatch, ownProps) => {
  return {
    create(document) {
      return dispatch(createDocument(ownProps.modelName, document));
    },
    update(document) {
      return dispatch(updateDocument(ownProps.modelName, ownProps.id, document));
    },
    delete() {
      return dispatch(deleteDocument(ownProps.modelName, ownProps.id));
    },
  };
})(EditForm);
