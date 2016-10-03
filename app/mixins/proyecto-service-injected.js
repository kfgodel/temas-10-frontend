import Ember from "ember";

/**
 * Este mixin facilita la inyeccion del servicio de proyectos
 */
export default Ember.Mixin.create({
  _proyectoService: Ember.inject.service('proyecto-service'),
  proyectoService(){
    return this.get('_proyectoService');
  },
});
