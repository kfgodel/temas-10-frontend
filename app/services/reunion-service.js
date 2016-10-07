import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar las reuniones
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllReuniones: function () {
    return this._proyectoResource().getAll();
  },
  createReunion: function (proyecto) {
    return this._proyectoResource().create(proyecto);
  },
  getReunion: function (userId) {
    return this._proyectoResource().getSingle(userId);
  },
  updateReunion: function (proyecto) {
    return this._proyectoResource().update(proyecto);
  },
  removeReunion: function (user) {
    return this._proyectoResource().remove(user);
  },

  // PRIVATE
  _proyectoResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('reuniones');
    return resource;
  },

});