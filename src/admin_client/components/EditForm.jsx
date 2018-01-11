import React, {Component} from 'react';
import {connect} from 'react-redux';
import pluralize from 'pluralize';
import {createDocument, updateDocument, deleteDocument} from '../modules/modelData';
import {postNotification, clearNotification, SUCCESS, INFO, ERROR} from '../modules/notifications';

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
    if (!this.props.id) {
      return false;
    }
    const deletingNotification = this.props.postNotification(INFO, 'Deleting...');
    return this.props.delete()
      .then(() => {
        this.props.clearNotification(deletingNotification.key);
        this.props.postNotification(SUCCESS, 'Deleted successfully!');
        return this.props.onClose();
      })
      .catch(err => err.json())
      .then(error => {
        if (error) {
          this.props.clearNotification(deletingNotification.key);
          this.props.postNotification(ERROR, error.message);
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const savingNotification = this.props.postNotification(INFO, 'Saving...');
    return (this.props.id ?
      this.props.update(this.state) :
      this.props.create(this.state)
    ).then(() => {
      this.props.clearNotification(savingNotification.key);
      this.props.postNotification(SUCCESS, 'Saved successfully!');
      return this.props.onClose();
    })
    .catch(err => err.json())
    .then(error => {
      if (error) {
        this.props.clearNotification(savingNotification.key);
        this.props.postNotification(ERROR, error.message);
      }
    });
  }

  render() {
    const document = this.props.document || {};
    return (
      <form className="form" key={this.props.id && this.props.document} onSubmit={this.handleSubmit.bind(this)}>
        {this.props.fields.map(field => (
          <div key={field.key} className="form-group">
            <field.editorComponent
              label={field.key}
              field={field}
              value={this.state[field.key] || ''}
              valueChanged={value => {
                this.setState({
                  [field.key]: value,
                });
              }}
            />
          </div>
        ))}
        <div className="btn-toolbar">
          <a href="#" disabled={!this.props.id} className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</a>
          <a href="#" className="btn btn-light" onClick={this.handleCancel.bind(this)}>Cancel</a>
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
    postNotification(status, message) {
      return dispatch(postNotification(status, message));
    },
    clearNotification(key) {
      return dispatch(clearNotification(key));
    },
  };
})(EditForm);
