import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de temas
 */
export default Ember.Mixin.create({
  _temaService: Ember.inject.service('tema-service'),
  temaService(){
    return this.get('_temaService');
  },
});
