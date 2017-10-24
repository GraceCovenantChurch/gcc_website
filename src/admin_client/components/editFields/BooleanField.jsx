import React from 'react';
import Field from './Field';

class BooleanField extends Field {
  render() {
    return (
      <input type="checkbox" className="checkbox"
        checked={this.props.value}
        onChange={e => {
          this.props.valueChanged(e.target.checked);
        }}
      />
    );
  }
};

export default BooleanField;
