import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Promise from 'bluebird';

import styles from './TableView.css';

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.resizeHandler = this.onWindowResize.bind(this);
    this.mouseUpHandler = this.handleMouseUp.bind(this);
    this.mouseMoveHandler = this.handleMouseMove.bind(this);
    this.columnsDirty = true;

    this.resizing = false;
    this.resizeStartX = undefined;
  }

  getChildContext() {
    return {
      table: this,
    };
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

  setColumnWidths() {
    this.columnsDirty = false;
    return Promise.map(this.props.columns, (column) => {
      const cell = this[`${column.key}-header`];
      if (!cell) {
        return Promise.resolve();
      }
      const el = cell.cell;
      return new Promise((resolve) => {
        this.setState({
          [`${column.key}-width`]: `${el.clientWidth}px`,
        }, resolve);
      });
    });
  }

  initializeColumnResize(column, startX) {
    this.setColumnWidths().then(() => {
      this.resizeStartX = startX;
      this.resizingColumns = [
        column,
        this.props.columns[this.props.columns.findIndex(col => (col.key === column)) - 1].key,
      ];

      this.initialWidths = this.resizingColumns.map(col => this[`${col}-header`].refs.cell.clientWidth);
      this.resizing = true;
    });
  }

  handleMouseMove(e) {
    if (this.resizing) {
      this.setState({
        [`${this.resizingColumns[0]}-width`]: `${this.initialWidths[0] - (e.screenX - this.resizeStartX)}px`,
        [`${this.resizingColumns[1]}-width`]: `${this.initialWidths[1] + (e.screenX - this.resizeStartX)}px`,
      });
      if (e.buttons !== 1) {
        this.finishColumnResize();
      }
    }
  }

  handleMouseUp() {
    process.nextTick(() => this.finishColumnResize());
  }

  finishColumnResize() {
    this.resizing = false;
  }

  render() {
    return (
      <div
        ref={(el) => { this.tabel = el; }}
        className={styles['table-view']}
        onMouseMove={this.mouseMoveHandler}
        onMouseUp={this.mouseUpHandler}
      >
        <TableRow>
          {this.props.columns.map(column => (
            <TableCell ref={(el) => { this[`${column.key}-header`] = el; }} key={column.key} column={column.key} initialSize={column.initialSize}>
              <strong>{column.key}</strong>
            </TableCell>
          ))}
        </TableRow>
        {React.Children.map(this.props.children, child => (
          React.cloneElement(child, {
            onClick: child.props.onClick && ((e) => {
              if (this.resizing) {
                e.preventDefault();
                e.stopPropagation();
              } else {
                child.props.onClick(e);
              }
            }),
          })
        ))}
      </div>
    );
  }
}

TableView.childContextTypes = {
  table: PropTypes.instanceOf(TableView),
};

TableView.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    initialSize: PropTypes.string.isRequired,
  })).isRequired,
};

TableView.defaultProps = {
  children: null,
};

class TableRow extends Component {
  render() {
    return (
      <div className={styles['table-row']} {...this.props}>
        {this.context.table.props.columns.map((column) => {
          const cell = React.Children.toArray(this.props.children)
            .find(child => child.props.column === column.key);
          if (!cell) {
            return <TableCell key={column.key} column={column.key} />;
          }
          return React.cloneElement(cell, {
            onClick: cell.props.onClick && ((e) => {
              if (this.context.table.resizing) {
                e.preventDefault();
                e.stopPropagation();
              } else {
                cell.props.onClick(e);
              }
            }),
          });
        })}
      </div>
    );
  }
}

TableRow.contextTypes = {
  table: PropTypes.instanceOf(TableView),
};

TableRow.propTypes = {
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: null,
};

class TableCell extends Component {
  constructor(props) {
    super(props);
    this.mouseDownHandler = this.handleMouseDown.bind(this);
  }

  handleMouseDown(e) {
    this.context.table.initializeColumnResize(this.props.column, e.screenX);
  }

  render() {
    const { column, initialSize, ...props } = this.props;
    const basis = (this.context.table.state[`${column}-width`] || initialSize);
    return (
      <div
        ref={(el) => { this.cell = el; }}
        className={`${styles['table-cell']} ${column}-column`}
        style={{
          flexBasis: basis,
        }}
        {...props}
      >
        <div
          className={`${styles['resize-handle']} ${styles['resize-handle-left']}`}
          onMouseDown={this.mouseDownHandler}
        />
        {this.props.children}
      </div>
    );
  }
}

TableCell.contextTypes = {
  table: PropTypes.instanceOf(TableView),
};

TableCell.propTypes = {
  children: PropTypes.node,
  column: PropTypes.string.isRequired,
  initialSize: PropTypes.string.isRequired,
};

TableCell.defaultProps = {
  children: null,
};

export default TableView;
export { TableRow, TableCell };
