import Ember from 'ember';
import EmberizedResourceCreatorInjected from "ateam-ember-resource/mixins/emberized-resource-creator-injected";

export default Ember.Service.extend(EmberizedResourceCreatorInjected,{

  getMinutaDeReunion(reunion){
    return this._minutaDeReunionResource().getSingle(reunion);
  },

  //private
  _minutaDeReunionResource: function () {
    var resourceCreator = this.resourceCreator();
    var resource = resourceCreator.createResource('minuta/reunion');
    return resource;
  }
});
