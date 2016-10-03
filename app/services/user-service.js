import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar los usuarios
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllUsers: function () {
    return this._userResource().getAll();
  },
  createUser: function () {
    return this._userResource().create();
  },
  getUser: function (userId) {
    return this._userResource().getSingle(userId);
  },
  updateUser: function (user) {
    return this._userResource().update(user);
  },
  removeUser: function (user) {
    return this._userResource().remove(user);
  },
  // PRIVATE
  _userResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('users');
    return resource;
  },

});