import React from 'react';
import withTitle from '../hoc/withTitle';

const NotFound = () => <div>Nothing here!</div>;

export default withTitle('Error: Not Found')(NotFound);
