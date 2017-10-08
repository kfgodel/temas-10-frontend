import Ember from 'ember';

export default Ember.Component.extend({
  usuariosSeleccionables:Ember.computed('unAction-item.responsables', function () {
    var todosLosUsuarios = this.get('usuarios');
    var usuariosSeleccionados = this.get('unAction-item.responsables');
    return todosLosUsuarios.filter(function (usuario) {
      return !usuariosSeleccionados.some(function(seleccionado){
        return usuario.id === seleccionado.id;
      });
    });
  }),
  actions:{
    borrarActionItem(unActionItem){
      var actionItems= this.get('actionItems');
      actionItems.removeObject(unActionItem);
      this.rerender();
    },
  },
});
