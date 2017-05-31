var express = require('express');
var router = express.Router();
var mime = require('mime');
var File = require('../../models/file.js');
var Promise = require('bluebird');
var fsReadFile = Promise.promisify(require('fs').readFile);
var formidable = require('formidable');
var path = require('path');

function createCRUD(router, route, defaultObject, Model, guiRoute) {
  var createRoute = route;
  var updateRoute = route + '/:id';
  var deleteRoute = route + '/:id/delete';
  var catchRoute = route + '/*';

  router.post(createRoute, function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      var fileIds = Object.keys(files);

      var filePromises = fileIds.map(function(fileId) {
        var file = files[fileId];
        if (file.size === 0) {
          return Promise.resolve();
        } else {
          return fsReadFile(file.path).then(function(data) {
            return File.create({
              data: data,
              contentType: mime.lookup(file.path)
            });
          });
        }
      });

      var document = new Model();
      delete fields['_id'];
      Object.assign(document, fields);
      Promise.all(filePromises).then(function(fileDocuments) {
        for (var i = 0; i < fileIds.length; ++i) {
          if (fileDocuments[i]) {
            document[fileIds[i]] = fileDocuments[i]._id;
          }
        }
        document.save(function(err) {
          if (err) {
            console.log(err);
          }
          res.redirect(guiRoute);
        });
      });
    });
  });

  router.post(updateRoute, function(req, res) {
    var form = new formidable.IncomingForm();
    console.log("trying to update");
    form.parse(req, function(err, fields, files) {
      var fileIds = Object.keys(files);

      var filePromises = fileIds.map(function(fileId) {
        var file = files[fileId];
        if (file.size === 0) {
          return Promise.resolve();
        } else {
          return fsReadFile(file.path).then(function(data) {
            return File.create({
              data: data,
              contentType: mime.lookup(file.path)
            });
          });
        }
      });

      var promise = Model.findById(fields._id).exec();
      promise.then(function(document) {
        if (document) {
          Object.assign(document, fields);
          return Promise.all(filePromises).then(function(fileDocuments) {
            for (var i = 0; i < fileIds.length; ++i) {
              if (fileDocuments[i]) {
                document[fileIds[i]] = fileDocuments[i]._id;
              }
            }
            return document.save();
          });
        } else {
          return Promise.reject('Could not find document with id: ' + fields._id);
        }
      }).catch(function(err) {
          console.log(err);
      }).finally(function() {
        res.redirect(guiRoute);
      });
    });
  });

  router.get(deleteRoute, function(req, res) {
    var promise = Model.findById(req.params.id).exec();
    promise.then(function(document) {
      return document.remove();
    }).catch(function(err) {
      console.log(err);
    }).finally(function() {
      res.redirect(guiRoute);
    });
  });

  router.get(catchRoute, function(req, res) {
    res.redirect(guiRoute);
  });
};

module.exports = createCRUD;
