import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ReunionServiceInjected, NavigatorInjected, {

  anchoDeTabla: 's12',

  reunionSeleccionada: Ember.computed('model.[]', 'indiceSeleccionado', function () {
    var indiceSeleccionado = this.get('indiceSeleccionado');
    var reuniones = this._reuniones();
    return reuniones.objectAt(indiceSeleccionado);
  }),

  actions: {
    verReunion(reunion){
      this._mostrarDetalleDe(reunion);
    },
    editarReunion(reunion){
      this.navigator().navigateToReunionesEdit(reunion.get('id'));
    },
    crearReunion(){
      this._guardarNuevaYRecargar();
    },
    borrarReunion(reunion){
      this.reunionService().removeReunion(reunion)
        .then(()=> {
          this._ocultarDetalle();
          this._recargarLista();
        });
    }
  },

  _mostrarDetalleDe(reunion){
    var indiceClickeado = this._reuniones().indexOf(reunion);
    this.set('indiceSeleccionado', indiceClickeado);
    this._mostrarDetalle();
  },

  _guardarNuevaYRecargar(){
    this.reunionService().createReunion(Ember.Object.create())
      .then(()=> {
        this._recargarLista();
      });
  },

  _recargarLista(){
    this.get('target.router').refresh();
  },

  _ocultarDetalle(){
    this.set('mostrandoDetalle', false);
    this.set('anchoDeTabla', 's12');
  },
  _mostrarDetalle(){
    this.set('anchoDeTabla', 's4');
    this.set('mostrandoDetalle', true);
  },

  _reuniones(){
    return this.get('model');
  }


});