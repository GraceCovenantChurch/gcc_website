/* global NCONF:true */
export default {
  get(name) {
    return NCONF[name];
  },
};
