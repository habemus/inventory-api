// third-party
const Bluebird = require('bluebird');

module.exports = function (app, options) {

  const Organization = app.services.mongoose.models.Organization;

  const errors = app.errors;

  var ctrl = {};

  /**
   * Creates a new organization
   * @param  {Object} orgData
   * @return {Bluebird -> org}
   */
  ctrl.create = function (user, orgData) {
    var org = new Organization(orgData);

    return org.save();
  };

  ctrl.getById = function (id) {
    return Organization.findOne({
      _id: id,
    })
    .then((organization) => {
      if (!organization) {
        return Bluebird.reject(new errors.NotFound('organization', id));
      } else {
        return organization;
      }
    });
  };

  return ctrl;
};
