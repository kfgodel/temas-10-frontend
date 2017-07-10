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

  actions: {
    verEditorDeConclusion(tema){
        this._mostrarEditorDeConclusion(tema);
    },

    cerrarEditor(){
      this._ocultarEditor();
    },
    guardarConclusion(){
      this.temaDeMinutaService().updateTemaDeMinuta(this.get('temaSeleccionado'))
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

    this.set('mostrandoEditor', false);
    this.set('anchoDeTabla', 's12');
  },
  _recargarLista(){
    this.get('target.router').refresh();
  },

});
