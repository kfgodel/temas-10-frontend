import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de reuniones
 */
export default Ember.Mixin.create({
  _reunionService: Ember.inject.service('reunion-service'),
  reunionService(){
    return this.get('_reunionService');
  },
});
