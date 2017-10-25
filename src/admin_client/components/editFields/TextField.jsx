import React from 'react';
import Field from './Field';

class TextField extends Field {
  render() {
    return (
      <input type="text" className="form-control" placeholder={this.props.field.key}
        value={this.props.value}
        onChange={e => {
          this.props.valueChanged(e.target.value);
        }}
      />
    );
  }
};

export default TextField;
