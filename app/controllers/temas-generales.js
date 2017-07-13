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

  nombreDeDuraciones: Ember.computed('duraciones',function(){
    return this.get('duraciones').map(function(duracion){
      return duracion.nombre;
    });
  }),

  actions: {

    mostrarFormularioDeAlta(){
      this._traerDuraciones().then(() => {
        this.set('mostrandoFormularioDeAlta', true);
        this.set('mostrandoFormularioDeEdicion', false);
        this.set('nuevoTema', Tema.create({
            idDeAutor: this._idDeUsuarioActual(),
            usuarioActual: this.get('model.usuarioActual'),
            idDeUltimoModificador:this._idDeUsuarioActual()
          })
        );
      });
    },

    mostrarFormularioDeEdicion(tema){
      this._traerDuraciones().then(() => {
        this.set('nuevoTema', Tema.create({
          id: tema.id,
          idDeAutor: tema.idDeAutor,
          usuarioActual: tema.usuarioActual,
          titulo: tema.titulo,
          duracion: tema.duracion,
          descripcion: tema.descripcion,
          idDeUltimoModificador:this._idDeUsuarioActual()
        }));
        this.set('mostrandoFormularioDeAlta', false);
        this.set('mostrandoFormularioDeEdicion', true);
      });
    },

    cerrarFormularioDeAlta(){
      this.set('mostrandoFormularioDeAlta', false);
    },

    cerrarFormularioDeEdicion(){
      this.set('mostrandoFormularioDeEdicion', false);
    },

    agregarTema(){
      this._guardarTemaYRecargar();
    },

    actualizarTema(){
      this._actualizarTemaYRecargar();
    },

    seleccionarDuracion(duracion){
      this.set('nuevoTema.duracion', duracion);
    },

    pedirConfirmacionDeBorrado(temaABorrar){
      this.set('mostrandoFormularioDeAlta', false);
      this.set('mostrandoFormularioDeEdicion', false);
      this.set('temaABorrar', temaABorrar);
      this.set('mensajeDeConfirmacionDeBorrado', `¿Estás seguro de borrar el tema general "${temaABorrar.titulo}"?`);
      this.set('modalDeBorradoAbierto', true);
    },

    borrarTemaElegido(){
      var temaBorrable = this.get('temaABorrar');
      delete this.temaABorrar;
      this._borrarTema(temaBorrable);
    },
  },

  _idDeUsuarioActual(){
    return this.get('usuarioActual.id');
  },

  _traerDuraciones(){
    return this.duracionesService().getAll().then((duraciones) => {
      this.set('duraciones', duraciones);
    });
  },

  _guardarTemaYRecargar: function () {
    var tema = this.get('nuevoTema');
    this.temasGeneralesService().createTemaGeneral(tema).then(() => {
      this.set('mostrandoFormularioDeAlta', false);
      this._recargarTemasGenerales();
    });
  },

  _actualizarTemaYRecargar(){
    var tema = this.get('nuevoTema');
    this.temasGeneralesService().updateTemaGeneral(tema).then(() => {
      this.set('mostrandoFormularioDeEdicion', false);
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

  _borrarTema(tema){
    this.temasGeneralesService().deleteTemaGeneral(tema).then(() => {
      this._recargarTemasGenerales();
    });
  },

});
