import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {Link, withRouter} from 'react-router-dom';
import Switch from 'react-router/Switch';
import Route from 'react-router/Route';
import Helmet from 'react-helmet';
import pluralize from 'pluralize';
import TableView, {TableRow, TableCell} from '../components/TableView';
import Modal from '../components/Modal';
import EditForm from '../components/EditForm';
import withTitle from '../../client/hoc/withTitle';
import {fetchModelData} from '../modules/modelData';

class ModalEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open != this.state.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  render() {
    const page = this.props.page;
    const closeModal = () => page.props.history.push(page.props.match.url);
    const confirmAndClose = () => confirm('Are you sure you want to cancel?') && closeModal();

    return (
      <Modal open={this.state.open} onClose={confirmAndClose} title={this.props.title} >
        <EditForm
          key={this.props.formKey}
          id={this.props.id}
          onClose={closeModal}
          modelName={page.props.modelName}
          fields={page.props.modelFields}
        />
      </Modal>
    );
  }
};

class ModelPage extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const fieldColumnIndices = {};
    this.props.modelFields.forEach((field, i) => {
      Object.assign(fieldColumnIndices, {
        [field.key]: i,
      });
    });

    return (
      <div className="container">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/public/assets/adminModelPage.bundle.css" />
        </Helmet>
        <Switch>
          <Route path={`${this.props.match.url}/new`} render={(props) => (
            <ModalEditForm page={this} open={true} formKey="new"
              title={`New ${this.props.modelName}`}
            />
          )} />
          <Route path={`${this.props.match.url}/:id/edit`} render={(props) => (
            <ModalEditForm page={this} open={true} formKey="edit"
              title={`Edit ${this.props.modelName}`}
              id={props.match.params.id}
            />
          )} />
          <Route render={(props) => (
            <ModalEditForm page={this} open={false} formKey="default"
              title={pluralize(this.props.modelName)}
            />
          )} />
        </Switch>

        <div>
          <div className="pull-right">
            <Link to={`${this.props.match.url}/new`} className="btn btn-primary">New</Link>
          </div>
          <h1>{pluralize(this.props.modelName)}</h1>
        </div>
        <TableView columns={this.props.modelFields}>
          {(this.props.sort ? this.props.data.concat().sort(this.props.sort) : this.props.data).map(datum => (
            <TableRow
                key={datum._id}
                onClick={() => this.props.history.push(`${this.props.match.url}/${datum._id}/edit`)}
                style={{ cursor: 'pointer' }}
            >
              {Object.keys(datum).map((key, i) => {
                const field = this.props.modelFields[fieldColumnIndices[key]];
                return (
                  <TableCell column={key} key={key}>
                    {field && field.displayComponent ? <field.displayComponent value={datum[key]} /> : datum[key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableView>
      </div>
    )
  }
};

const withData = connect((state, ownProps) => {
  const modelData = state.modelData[pluralize(ownProps.modelName)];
  return {
    data: modelData ? modelData.ids.map(id => modelData.__DB__[id]) : [],
  }
}, (dispatch, ownProps) => {
  return {
    fetchData() {
      return dispatch(fetchModelData(ownProps.modelName));
    }
  }
});

export default compose(withData, withTitle(ownProps => pluralize(ownProps.modelName)), withRouter)(ModelPage);
