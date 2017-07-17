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
  votarTema:function(temaId){
    return this._temaAgregarVotoResource().getSingle(temaId);
  },
  quitarVotoTema:function(temaId){
    return this._temaQuitarVotosResource().getSingle(temaId);
  },


  // PRIVATE
  _temaResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('temas');
    return resource;
  },
  _temaAgregarVotoResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('temas/votar');
    return resource;
  },
  _temaQuitarVotosResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('temas/desvotar');
    return resource;
  },

});
