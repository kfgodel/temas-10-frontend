import Ember from "ember";

export default Ember.Controller.extend({

  id: Ember.computed('model.reunionId', function () {
    return this.get('model.reunionId');
  }),

  usuarios: Ember.computed('model.usuarios', function () {
    return this.get('model.usuarios');
  }),

  actions: {
    seleccionarUsuario: function (usuariosSeleccionados) {
      this.set('usuariosSeleccionados', usuariosSeleccionados)
    }
  }
});
