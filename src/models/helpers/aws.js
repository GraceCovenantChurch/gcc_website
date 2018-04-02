import AWS from 'aws-sdk';
import nconf from '../../config';

AWS.config.update({
  region: nconf.get('AWS_REGION'),
  accessKeyId: nconf.get('AWS_ACCESS_KEY_ID'),
  secretAccessKey: nconf.get('AWS_SECRET_ACCESS_KEY'),
});

/**
 * Gets an AWS.S3 bucket object
 * @param {string} bucket - The name of the S3 bucket
 * @returns {AWS.S3}
 */
export function s3Bucket(bucket) {
  return new AWS.S3({
    params: {
      Bucket: bucket,
    },
  });
}

export default AWS;
