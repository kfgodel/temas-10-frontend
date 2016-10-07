import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar las reuniones
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllTemas: function () {
    return this._proyectoResource().getAll();
  },
  createTema: function (proyecto) {
    return this._proyectoResource().create(proyecto);
  },
  getTema: function (userId) {
    return this._proyectoResource().getSingle(userId);
  },
  updateTema: function (proyecto) {
    return this._proyectoResource().update(proyecto);
  },
  removeTema: function (user) {
    return this._proyectoResource().remove(user);
  },

  // PRIVATE
  _proyectoResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('temas');
    return resource;
  },

});