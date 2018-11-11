/* eslint-env node, jest */

import fetch from 'isomorphic-fetch';
import { withDB } from '../../test/dbSetup';
import { itPrivate } from '../../test/env';
import nconf from '../../src/config';
import S3Resource from './s3resource';

describe('S3Resource', () => {
  withDB();

  itPrivate('uploads and destroys', () => {
    const data = [...new Array(10)].map(() => Math.random()).join('');
    return S3Resource.Upload(
      nconf.get('AWS_ASSET_BUCKET'),
      's3resource-uploads-and-destroys',
      data, {
        ACL: 'public-read',
        ContentType: 'text',
      },
    ).then((s3Resource) => {
      const { fileUrl } = s3Resource;
      return fetch(fileUrl).then((response) => {
        if (response.status >= 400) {
          throw new Error(`Failed to fetch test file. ${response.statusText}`);
        }
        return response.text();
      }).then((text) => {
        expect(text).toBe(data);
        return s3Resource.remove();
      });
    });
  });
});
