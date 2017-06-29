import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";
import DuracionesServiceInjected from "../../mixins/duraciones-service-injected";
export default Ember.Controller.extend(ReunionServiceInjected, NavigatorInjected,DuracionesServiceInjected, {

  anchoDeTabla: 's12',

  reunionSeleccionada: Ember.computed('model.[]', 'indiceSeleccionado', function () {
    var indiceSeleccionado = this.get('indiceSeleccionado');
    var reuniones = this._reuniones();
    return reuniones.objectAt(indiceSeleccionado);
  }),
  mostrarBotonDeEstimacion:Ember.computed('reunionSeleccionada',function(){
    return this.get('reunionSeleccionada.status')==="CERRADA";
  }),
  duracionDeReunion:180,
  temasEstimados: Ember.computed('duracionDeReunion',function(){
    var temas= this.get('reunionSeleccionada.temasPropuestos');
    var duracionRestante=this.duracionDeReunion;
    var i=0;
    var temasQueEntran=[];
    while(i<temas.length && duracionRestante>=this._obtenerDuracionDeTema(temas.get(i)).cantidadDeMinutos){
      temasQueEntran.push(temas.get(i));
      duracionRestante=duracionRestante- this._obtenerDuracionDeTema(temas.get(i)).cantidadDeMinutos;
      i++;
    }
    return temasQueEntran;
  }),
  actions: {
    verReunion(reunion){
      this._mostrarDetalleDe(reunion);
    },
    cerrarDetalle(){
      this._ocultarDetalle();
    },
    mostrarEstimacion(){
      this._traerDuraciones().then(() => {
        this.set('mostrandoEstimacion',true);
      });
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
    },
    cerrarEstimador(){
      this.set('mostrandoEstimacion',false);
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
  },
  _traerDuraciones(){
    return this.duracionesService().getAll().then((duraciones)=> {
      this.set('duraciones',duraciones);
    });
  },
  _obtenerDuracionDeTema(unTema){
   var duraciones= this.get('duraciones');
    return duraciones.find(function (duracion) {
     return duracion.nombre===unTema.duracion;
   });
  },
});
