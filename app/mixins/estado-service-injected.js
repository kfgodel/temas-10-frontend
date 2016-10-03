import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de estados
 */
export default Ember.Mixin.create({
  _estadoService: Ember.inject.service('estado-service'),
  estadoService(){
    return this.get('_estadoService');
  },
});
