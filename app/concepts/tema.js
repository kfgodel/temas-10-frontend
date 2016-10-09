import Ember from "ember";

export default Ember.Object.extend({

  cantidadVotosTotales: Ember.computed('idsDeInteresados.[]', function () {
    return this.get('idsDeInteresados.length');
  }),

  cantidadVotosPropios: Ember.computed('idsDeInteresados.[]', 'usuarioActual', function () {
    var idDeUsuarioActual = this.get('usuarioActual.id');
    var votosDelUsuario = this.get('idsDeInteresados').filter(function (idDeInteresado) {
      return idDeInteresado === idDeUsuarioActual;
    });
    return votosDelUsuario.length;
  }),


  agregarInteresado(idDeInteresado){
    this.get('idsDeInteresados').pushObject(idDeInteresado);
  }
});