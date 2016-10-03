import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar los proyectos
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllProyectos: function () {
    return this._proyectoResource().getAll();
  },
  createProyecto: function (proyecto) {
    return this._proyectoResource().create(proyecto);
  },
  getProyecto: function (userId) {
    return this._proyectoResource().getSingle(userId);
  },
  updateProyecto: function (proyecto) {
    return this._proyectoResource().update(proyecto);
  },
  removeProyecto: function (user) {
    return this._proyectoResource().remove(user);
  },

  // PRIVATE
  _proyectoResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('proyectos');
    return resource;
  },

});