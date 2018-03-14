import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pluralize from 'pluralize';
import { createDocument, updateDocument, deleteDocument } from '../modules/modelData';
import { postNotification, clearNotification, SUCCESS, INFO, ERROR } from '../modules/notifications';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.document || {};
    this.cancelHandler = this.handleCancel.bind(this);
    this.deleteHandler = this.handleDelete.bind(this);
    this.submitHandler = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.document || {});
  }

  hasChanges() {
    let changed = false;
    const document = this.props.document || {};
    Object.keys(this.state).forEach((key) => {
      if (this.state[key] !== document[key]) {
        changed = true;
      }
    });
    return changed;
  }

  handleCancel(e) {
    e.preventDefault();
    return (
      (!this.hasChanges() || confirm('Are you sure you want to cancel?')) &&
      this.props.onClose &&
      this.props.onClose()
    );
  }

  handleDelete(e) {
    e.preventDefault();
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
      .then((error) => {
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
      .then((error) => {
        if (error) {
          this.props.clearNotification(savingNotification.key);
          this.props.postNotification(ERROR, error.message);
        }
      });
  }

  render() {
    return (
      <form className="form" key={this.props.id && this.props.document} onSubmit={this.submitHandler}>
        {this.props.fields.map(field => (
          <div key={field.key} className="form-group">
            <field.editorComponent
              label={field.key}
              field={field}
              value={this.state[field.key] || ''}
              valueChanged={(value) => {
                this.setState({
                  [field.key]: value,
                });
              }}
            />
          </div>
        ))}
        <div className="btn-toolbar">
          <button disabled={!this.props.id} className="btn btn-danger" onClick={this.deleteHandler}>Delete</button>
          <button className="btn btn-light" onClick={this.cancelHandler}>Cancel</button>
          <button className="btn btn-primary pull-right" type="submit">Save</button>
        </div>
      </form>
    );
  }
}

EditForm.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  document: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    editorComponent: PropTypes.func.isRequired,
  })).isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
  postNotification: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

EditForm.defaultProps = {
  id: undefined,
  document: {},
};

export default connect((state, ownProps) => {
  const modelData = state.modelData[pluralize(ownProps.modelName)];
  return {
    document: modelData && modelData.__DB__[ownProps.id],
  };
}, (dispatch, ownProps) => (
  {
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
  }
))(EditForm);
