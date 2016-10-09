import Ember from "ember";
import ReunionServiceInjected from "../mixins/reunion-service-injected";
import TemaServiceInjected from "../mixins/tema-service-injected";

export default Ember.Controller.extend(ReunionServiceInjected, TemaServiceInjected, {

  proximaRoots: Ember.computed('model', function () {
    return this.get('model');
  }),

  mostrandoFecha: Ember.computed('editandoFecha', function () {
    return !this.get('editandoFecha');
  }),

  fechaObserver: Ember.observer('proximaRoots.fecha', function () {
    if (this.get('editandoFecha')) {
      this.set('editandoFecha', false);
      this._guardarCambios();
    }
  }),


  actions: {
    sumarVoto(tema){
      tema.incrementProperty('cantidadVotosTotales');
      tema.incrementProperty('cantidadVotosPropios');
    },
    restarVoto(tema){
      tema.decrementProperty('cantidadVotosTotales');
      tema.decrementProperty('cantidadVotosPropios');
    },
    mostrarFormulario(){
      this.set('mostrandoFormulario', true);
      this.set('nuevoTema', Ember.Object.create());
    },
    agregarTema(){
      this._guardarTemaYAgregar();
    },
    quitarTema(tema){
      this._quitarTemaYBorrar(tema);
    },
    editarFecha(){
      this.set('editandoFecha', true);
    }
  },

  _guardarCambios(){
    var reunion = this.get('proximaRoots');
    return this.reunionService().updateReunion(reunion)
      .then((reunionGuardada)=> {
        this.set('proximaRoots', reunionGuardada)
      });
  },

  _guardarTemaYAgregar: function () {
    var tema = this.get('nuevoTema');
    this.temaService().createTema(tema)
      .then((creado)=> {
        this._agregarCreado(creado);
      });
  },
  _agregarCreado: function (creado) {
    var temasDeLaReunion = this.get('proximaRoots.temasPropuestos');
    temasDeLaReunion.pushObject(creado);
    this._guardarCambios().then(()=> {
      this.set('mostrandoFormulario', false);
    });
  },

  _quitarTemaYBorrar(tema){
    var temasDeLaReunion = this.get('proximaRoots.temasPropuestos');
    temasDeLaReunion.removeObject(tema);
    this._guardarCambios().then(()=> {
      this._borrarTema(tema);
    });
  },

  _borrarTema(tema){
    this.temaService().removeTema(tema);
  }


});