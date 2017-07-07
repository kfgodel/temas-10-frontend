import Ember from 'ember';
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";

export default Ember.Service.extend(EmberizedResourceCreatorInjected,{

  getMinuta(minuta){
    return this._minutaResource().getSingle(minuta);
  },
  getMinutaDeReunion(reunion){
    return this._minutaDeReunionResource().getSingle(reunion);
  },

  //private
  _minutaResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('minuta');
    return resource;
  },
  _minutaDeReunionResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('minuta/reunion');
    return resource;
  }
});
