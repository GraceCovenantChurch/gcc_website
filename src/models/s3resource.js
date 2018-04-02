import mongoose from 'mongoose';
import { s3Bucket } from './helpers/aws';

/**
 * The S3 resource schema used by mongoose
 * @type {mongoose.Schema}
 */
export const S3ResourceSchema = mongoose.Schema({
  bucket: {
    type: String,
    required: true,
    index: true,
  },
  key: {
    type: String,
    required: true,
    index: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

/**
 * Upload a resource to an S3 bucket
 * @param {string} bucket - The S3 bucket
 * @param {string} key - The key to name the object
 * @param {Buffer|Typed Array|Blob|String|ReadableStream} data - The data to upload
 * @param {Object} params - Additional parameters @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
 * @param {function(loaded: number, total:number)} [uploadProgress] -
 *   Callback function to report upload progress
 * @returns {Promise<S3Resource, Error>} -
 *   Returns a promise which resolves to the uploaded resource or rejects with an Error
 */
function S3ResourceUpload(bucket, key, data, params = {}, uploadProgress) {
  let managedUpload = s3Bucket(bucket).upload(Object.assign({}, params, {
    Key: key,
    Body: data,
  }));

  if (uploadProgress) {
    managedUpload = managedUpload.on('httpUploadProgress', uploadProgress);
  }

  return managedUpload.promise().then(({ Location: fileUrl }) => (
    this.findOneAndUpdate({ bucket, key }, { fileUrl }, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
  ));
}

/**
 * Function executed before removing the decoument
 * @param {function} next - The next function for Express
 * @returns {void}
 */
function preRemoveHook(next) {
  s3Bucket(this.bucket).deleteObject({ Key: this.key }, next);
}

/**
 * Function executed before finding and removing the decoument
 * @param {function} next - The next function for Express
 * @returns {void}
 */
function preFindOneAndRemoveHook(next) {
  this.model.findOne(this.getQuery()).then((resource) => {
    s3Bucket(resource.bucket).deleteObject({ Key: resource.key }, next);
  }).catch(err => next(err));
}

S3ResourceSchema.statics.Upload = S3ResourceUpload;
S3ResourceSchema.pre('remove', preRemoveHook);
S3ResourceSchema.pre('findOneAndRemove', preFindOneAndRemoveHook);

/**
 * A model object for S3 resources
 * @type {mongoose.Model}
 */
const S3Resource = mongoose.model('S3Resource', S3ResourceSchema);

export default S3Resource;
