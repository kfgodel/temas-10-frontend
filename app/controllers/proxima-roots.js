import Ember from "ember";
import ReunionServiceInjected from "../mixins/reunion-service-injected";
import TemaServiceInjected from "../mixins/tema-service-injected";

export default Ember.Controller.extend(ReunionServiceInjected, TemaServiceInjected, {

  proximaRoots: Ember.computed('model', function () {
    return this.get('model.proximaRoots');
  }),

  usuarioActual: Ember.computed('model', function () {
    return this.get('model.usuarioActual');
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
      this.set('nuevoTema', Ember.Object.create({
        idDeReunion: this._idDeReunion(),
        idDeAutor: this._idDeAutor()
        })
      );
    },
    agregarTema(){
      this._guardarTemaYRecargar();
    },
    quitarTema(tema){
      this._borrarTemaYRecargar(tema);
    },
    editarFecha(){
      this.set('editandoFecha', true);
    }
  },

  _guardarCambios(){
    var reunion = this.get('proximaRoots');
    return this.reunionService().updateReunion(reunion)
      .then((reunionGuardada)=> {
        this.set('proximaRoots', reunionGuardada);
      });
  },

  _recargarReunion(){
    this.reunionService().getReunion(this._idDeReunion()).then((reunion)=> {
      this.set('proximaRoots', reunion);
    });
  },


  _guardarTemaYRecargar: function () {
    var tema = this.get('nuevoTema');
    this.temaService().createTema(tema).then(()=> {
      this.set('mostrandoFormulario', false);
      this._recargarReunion();
    });
  },
  _borrarTemaYRecargar(tema){
    this.temaService().removeTema(tema).then(()=> {
      this._recargarReunion();
    });
  },

  _idDeReunion() {
    return this.get('proximaRoots.id');
  },

  _idDeAutor(){
    return this.get('usuarioActual.id');
  }


});