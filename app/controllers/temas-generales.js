import Ember from 'ember';
import TemaGeneralServiceInjected from "../mixins/tema-general-service-injected";
import DuracionesServiceInjected from "../mixins/duraciones-service-injected";
import Tema from "../concepts/tema";

export default Ember.Controller.extend(TemaGeneralServiceInjected, DuracionesServiceInjected, {

  guardarHabilitado: Ember.computed('nuevoTema.duracion', 'nuevoTema.titulo', function () {
    if (!this.get('nuevoTema.duracion') || !this.get('nuevoTema.titulo')) {
      return "disabled";
    }
    else {
      return "";
    }
  }),

  usuarioActual: Ember.computed('model.usuarioActual', function () {
    return this.get('model.usuarioActual');
  }),

  actions: {

    mostrarFormulario(){
      this.set('mostrandoFormulario', true);
      this.set('nuevoTema', Tema.create({
          idDeAutor: this._idDeUsuarioActual(),
          usuarioActual: this.get('model.usuarioActual'),
        })
      );
      this._traerDuraciones();
    },

    cerrarEditor(){
      this.set('mostrandoFormulario', false);
    },

    agregarTema(){
      this._guardarTemaYRecargar();
    },

    seleccionarDuracion(duracion){
      this.set('nuevoTema.duracion', duracion);
    },

  },

  _idDeUsuarioActual(){
    return this.get('usuarioActual.id');
  },

  _traerDuraciones(){
    this.duracionesService().getAll().then((duraciones) => {
      this.set('duraciones', duraciones);
    });
  },

  _guardarTemaYRecargar: function () {
    var tema = this.get('nuevoTema');
    this.temasGeneralesService().createTemaGeneral(tema).then(() => {
      this.set('mostrandoFormulario', false);
      this._recargarTemasGenerales();
    });
  },

  _recargarTemasGenerales(){
    this.temasGeneralesService().getAllTemasGenerales().then((temasGenerales) => {
      this._actualizarTemasGenerales(temasGenerales);
    });
  },

  _actualizarTemasGenerales(temasGenerales){
    this.set('model.temasGenerales', temasGenerales);
  },

});
