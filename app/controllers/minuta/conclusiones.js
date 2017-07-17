import Ember from "ember";
import TemaDeMinutaServiceInjected from "../../mixins/tema-de-minuta-service-injected";

export default Ember.Controller.extend(TemaDeMinutaServiceInjected,{
  anchoDeTabla: 's12',

  temaSeleccionado: Ember.computed('minuta', 'indiceSeleccionado', function () {
    var indiceSeleccionado = this.get('indiceSeleccionado');
    var temas = this.get('minuta.temas');

    return temas.objectAt(indiceSeleccionado);
  }),

  id: Ember.computed('model.reunionId', function () {
    return this.get('model.reunionId');
  }),

  minuta:Ember.computed('model.minuta',function(){
    return this.get('model.minuta');
  }),

  temaAEditar:Ember.computed('temaSeleccionado', function(){
    let tema = this.get('temaSeleccionado');
    let actionItems=[];
    this.get('temaSeleccionado.actionItems').forEach((actionItem)=> actionItems.push(actionItem));
    return Ember.Object.extend().create({
      id: tema.id,
      idDeMinuta: tema.idDeMinuta,
      tema: tema.tema,
      conclusion: tema.conclusion,
      fueTratado: tema.fueTratado,
      actionItems:actionItems
    });
  }),

  actions: {
    verEditorDeConclusion(tema){

        this._mostrarEditorDeConclusion(tema);
    },

    cerrarEditor(){
      this._ocultarEditor();
    },

    guardarConclusion(fueTratado){
      var tema=this.get('temaAEditar');
        tema.actionItems.forEach((actionItem)=>{
          delete actionItem.usuarios;
          delete actionItem.usuariosSeleccionables;
        });

      tema.set('fueTratado', fueTratado);

      this.temaDeMinutaService().updateTemaDeMinuta(tema)
        .then(()=> {
          this._recargarLista();

          this._ocultarEditor();
        });
    }
  },

  _mostrarEditorDeConclusion(tema){
    var indiceClickeado = this.get('minuta.temas').indexOf(tema);
    this.set('indiceSeleccionado', indiceClickeado);
    this._mostrarEditor();
  },

  _mostrarEditor(){
    this.set('anchoDeTabla', 's4');
    this.set('mostrandoEditor', true);
  },

  _ocultarEditor(){
    this.set('indiceSeleccionado',null);
    this.set('mostrandoEditor', false);
    this.set('anchoDeTabla', 's12');
  },

  _recargarLista(){
    this.get('target.router').refresh();
  },

});
