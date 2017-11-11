import React, {Component} from 'react';
import nconf from 'nconf';

export default function asyncComponent(path, getComponent) {
  const APP_ENV = nconf.get('APP_ENV');
  if (APP_ENV === 'server') {
    return require(path).default;
  } else {
    return class AsyncComponent extends Component {
      static WrappedAsyncComponent

      constructor(props) {
        super(props);
        this.state = { WrappedAsyncComponent: AsyncComponent.WrappedAsyncComponent };
      }

      componentWillMount() {
        if (!this.state.WrappedAsyncComponent) {
          getComponent().then(WrappedAsyncComponent => {
            AsyncComponent.WrappedAsyncComponent = WrappedAsyncComponent.default;
            this.setState({ WrappedAsyncComponent: WrappedAsyncComponent.default });
          }).catch(err => {
            console.error('Dynamic page loading failed:', err);
          });
        }
      }

      render() {
        const { WrappedAsyncComponent } = this.state;
        if (WrappedAsyncComponent) {
          return <WrappedAsyncComponent {...this.props} />;
        } else {
          return null;
        }
      }
    };
  }
}
