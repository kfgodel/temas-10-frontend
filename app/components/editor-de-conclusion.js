import Ember from 'ember';

export default Ember.Component.extend({

  fueTratado: Ember.computed( 'temaDeMinuta.conclusion', function() {
    return !!(this.get('temaDeMinuta.conclusion'));
  }),
  actions:{
    agregarActionItem(){
       this.get('temaDeMinuta.actionItems').push(
        Ember.Object.extend().create({
          descripcion:"",
          responsables:[],
          usuarios:this.get('usuarios')
        }).reopen({   usuariosSeleccionables:Ember.computed('responsables', function () {
        var todosLosUsuarios = this.get('usuarios');
        var usuariosSeleccionados = this.get('responsables');

        return todosLosUsuarios.filter(function (usuario) {
          return !usuariosSeleccionados.some(function(seleccionado){
            return usuario.id === seleccionado.id;
          });
        });
      }),}));
      this.rerender();
    },
    borrarActionItem(unActionItem){
      var actionItems= this.get('temaDeMinuta.actionItems');
      var index = actionItems.indexOf(unActionItem);

      actionItems.splice(index,1);
      this.rerender();
    }
    },
  });
