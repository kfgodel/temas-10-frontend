import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";

/**
 * Esta clase permite interactuar con el backend para modificar los elementos
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllElementos() {
    return this._elementoResource().getAll();
  },

  // PRIVATE
  _elementoResource() {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('proyectos/elementos');
    return resource;
  },

});