export default {
  get: function(name) {
    return NCONF[name];
  },
};
