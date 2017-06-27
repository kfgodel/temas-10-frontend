/**
 * Created by fede on 22/06/17.
 */
import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de duraciones
 */
export default Ember.Mixin.create({
  _duracionesService: Ember.inject.service('duraciones-service'),
  duracionesService(){
    return this.get('_duracionesService');
  },
});
