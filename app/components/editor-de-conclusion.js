import Ember from 'ember';

export default Ember.Component.extend({

  fueTratado: Ember.computed( 'temaDeMinuta.conclusion', function() {
    return !!(this.get('temaDeMinuta.conclusion'));
  }),
  guardarConclusionHabilitado:Ember.computed('temaDeMinuta.actionItems.@each.descripcion',
    'temaDeMinuta.actionItems.@each.responsables',
    'temaDeMinuta.actionItems.[]',function(){
    debugger;
    if(this.get('temaDeMinuta.actionItems').some((actionItem)=>{
        return  !actionItem.descripcion || actionItem.responsables.length<=0;
      })){
      return "disabled";
    }
    else{
      return "";
    }
  }),
  actions:{
    agregarActionItem(){
      this.get('temaDeMinuta').actionItems.pushObject(
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
      actionItems.removeObject(unActionItem);
      this.rerender();
    }
    },
  });
