import React from 'react';
import withTitle from '../hoc/withTitle';

const NotFound = () => <div>Nothing here!</div>;

const NotFoundPage = withTitle('Error: Not Found')(NotFound);

export default NotFoundPage;
