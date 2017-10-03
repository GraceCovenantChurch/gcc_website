import React, {Component} from 'react';
import Promise from 'bluebird';
const styles = (typeof CSS !== 'undefined') && require('./TableView.css');

export default class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeHandler = this.onWindowResize.bind(this);
    this.columnsDirty = true;

    this.resizing = false;
    this.resizeStartX = undefined;
  }

  setColumnWidths() {
    this.columnsDirty = false;
    return Promise.map(this.props.columns, column => {
      const cell = this.refs[`${column.key}-header`];
      const el = cell.refs.cell;
      return new Promise(resolve => {
        this.setState({
          [`${column.key}-width`]: el.clientWidth,
        }, resolve);
      });
    })
  }

  initializeColumnResize(column, startX) {
    this.setColumnWidths().then(() => {
      this.resizeStartX = startX;
      this.resizingColumns = [
        column,
        this.props.columns[this.props.columns.findIndex(col => (col.key == column)) - 1].key,
      ];

      this.initialWidths = this.resizingColumns.map(col => this.state[`${col}-width`]);
      this.resizing = true;
    });
  }

  handleMouseMove(e) {
    if (this.resizing) {
      this.setState({
        [`${this.resizingColumns[0]}-width`]: this.initialWidths[0] - (e.screenX - this.resizeStartX),
        [`${this.resizingColumns[1]}-width`]: this.initialWidths[1] + (e.screenX - this.resizeStartX),
      });
      if (e.buttons != 1) {
        this.finishColumnResize();
      }
    }
  }

  finishColumnResize() {
    this.resizing = false;
  }

  componentDidMount() {
    this.setColumnWidths();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  onWindowResize() {
    this.columnsDirty = true;
  }

  render() {
    return (
      <div ref="table" className="table-view"
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.finishColumnResize.bind(this)}
      >
        <TableRow table={this}>
          {this.props.columns.map(column => {
            return (
              <TableCell ref={`${column.key}-header`} key={column.key} column={column.key}>
                <strong>{column.key}</strong>
              </TableCell>
            );
          })}
        </TableRow>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, { table: this });
        })}
      </div>
    )
  }
};

export class TableRow extends Component {
  render() {
    return (
      <div className="table-row">
        {this.props.table.props.columns.map(column => {
          const cell = React.Children.toArray(this.props.children).find(child => {
            return child.props.column == column.key;
          });
          if (!cell) {
            return <TableCell key={column.key} column={column.key} table={this.props.table} />
          } else {
            return React.cloneElement(cell, {
              table: this.props.table,
            });
          }
        })}
      </div>
    );
  }
};

export class TableCell extends Component {

  handleMouseDown(e) {
    this.props.table.initializeColumnResize(this.props.column, e.screenX);
  }

  render() {
    const basis = (this.props.table.state[`${this.props.column}-width`] || this.props.initialSize);
    return (
      <div ref="cell" className={`table-cell ${this.props.column}-column`} style={{
        flexBasis: basis ? basis + 'px' : undefined,
      }}>
        <div className="resize-handle resize-handle-left"
          onMouseDown={this.handleMouseDown.bind(this)}
        />
        {this.props.children}
      </div>
    );
  }
};
