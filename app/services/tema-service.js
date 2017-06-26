import Ember from "ember";
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";
/**
 * Esta clase permite interactuar con el backend para modificar las reuniones
 */
export default Ember.Service.extend(EmberizedResourceCreatorInjected, {

  getAllTemas: function () {
    return this._temaResource().getAll();
  },
  createTema: function (tema) {
    return this._temaResource().create(tema);
  },
  getTema: function (userId) {
    return this._temaResource().getSingle(userId);
  },
  updateTema: function (tema) {
    return this._temaResource().update(tema);
  },
  removeTema: function (tema) {
    return this._temaResource().remove(tema);
  },

  // PRIVATE
  _temaResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('temas');
    return resource;
  },

});
