import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar las reuniones
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getProximaReunion(){
    return this._proximaReunionResource().getAll();
  },

  getAllReuniones() {
    return this._reunionResource().getAll();
  },
  createReunion(proyecto) {
    return this._reunionResource().create(proyecto);
  },
  getReunion(userId) {
    return this._reunionResource().getSingle(userId);
  },
  updateReunion(proyecto) {
    return this._reunionResource().update(proyecto);
  },
  removeReunion(user) {
    return this._reunionResource().remove(user);
  },

  // PRIVATE
  _reunionResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('reuniones');
    return resource;
  },
  _proximaReunionResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('reuniones/proxima');
    return resource;
  },

});