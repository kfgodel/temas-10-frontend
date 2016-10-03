import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de elementos
 */
export default Ember.Mixin.create({
  _elementoService: Ember.inject.service('elemento-service'),
  elementoService(){
    return this.get('_elementoService');
  },
});
