import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar los estados
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllEstados: function () {
    return this._estadoResource().getAll();
  },

  // PRIVATE
  _estadoResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('proyectos/estados');
    return resource;
  },

});