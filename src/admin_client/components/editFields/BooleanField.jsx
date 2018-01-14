import React from 'react';
import Field from './Field';

class BooleanField extends Field {
  render() {
    return (
      <div className="form-check">
        <input type="checkbox" className="form-check-input"
          checked={this.props.value}
          onChange={e => {
            this.props.valueChanged(e.target.checked);
          }}
        />
        <label className="form-check-label">{this.props.label}</label>
      </div>
    );
  }
};

export default BooleanField;
