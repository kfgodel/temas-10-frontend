import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import TemaServiceInjected from "../../mixins/tema-service-injected";
import DuracionesServiceInjected from "../../mixins/duraciones-service-injected";
import Tema from "../../concepts/tema";

export default Ember.Controller.extend(ReunionServiceInjected, TemaServiceInjected, DuracionesServiceInjected, {

  esObligatorio: false,
  mostrarObligatorios: false,

  reunion: Ember.computed('model.reunion', function () {
    return this.get('model.reunion');
  }),
  nombreDeDuraciones: Ember.computed('duraciones',function(){
    debugger;
    return this.get('duraciones').map(function(duracion){
      return duracion.nombre;
    });
  }),
  temasOrdenados: Ember.computed('reunion.temasPropuestos', function() {
    let todosLosTemas = this.get('reunion.temasPropuestos');
    let temasOrdenados = todosLosTemas.filter(function (tema) {
      return tema.obligatoriedad === "OBLIGATORIO_GENERAL";
    });
    temasOrdenados = temasOrdenados.concat(todosLosTemas.filter(function (tema) {
      return tema.obligatoriedad === "OBLIGATORIO";
    }));
    temasOrdenados = temasOrdenados.concat(todosLosTemas.filter(function (tema) {
      return tema.obligatoriedad === "NO_OBLIGATORIO";
    }));
    return temasOrdenados;
  }),

  estaCerrada: Ember.computed('reunion.status', function () {
    return this.get('reunion.status') === 'CERRADA';
  }),

  usuarioActual: Ember.computed('model.usuarioActual', function () {
    return this.get('model.usuarioActual');
  }),

  mostrandoFecha: Ember.computed('editandoFecha', function () {
    return !this.get('editandoFecha');
  }),

  fechaObserver: Ember.observer('reunion.fecha', function () {
    if (this.get('editandoFecha')) {
      this.set('editandoFecha', false);
      this._guardarCambios();
    }
  }),
  votosRestantes: Ember.computed('reunion.temasPropuestos.@each.cantidadVotosPropios', function () {
    var temas = this.get('reunion.temasPropuestos');
    var votosUsados = temas.reduce(function (total, tema) {
      return total + tema.get('cantidadVotosPropios');
    }, 0);
    return 3 - votosUsados;
  }),

  terminoDeVotar: Ember.computed('votosRestantes', function () {
    return this.get('votosRestantes') === 0;
  }),
  guardarHabilitado: Ember.computed('nuevoTema.duracion', 'nuevoTema.titulo', function () {
    if (!this.get('nuevoTema.duracion') || !this.get('nuevoTema.titulo')) {
      return "disabled";
    }
    else {
      return "";
    }
  }),
  actions: {
    sumarVoto(tema){
      this._siNoEstaCerrada(function () {
        if (this.get('votosRestantes')) {
          this._votarPorTema(tema);
        }
      });
    },
    seleccionarDuracion(duracion){
      debugger;
      this.set('nuevoTema.duracion', duracion);
    },

    cerrarEditorDeTemaNuevo(){
      this.set('mostrandoFormularioXTemaNuevo', false);
    },
    cerrarEditorDeTema(){
      this.set('mostrandoFormularioDeEdicion', false);
      this._recargarReunion();
    },
    restarVoto(tema){
      this._siNoEstaCerrada(function () {
        this._quitarVotoDeTema(tema);
      });
    },
    mostrarFormularioDeEdicion(tema){

      this._siNoEstaCerrada(function () {
        this._traerDuraciones().then((x)=>{
          this.set('nuevoTema', tema);
        this.set('obligatoriedadPasada',this.get('nuevoTema.obligatoriedad'));
        this.set('nuevoTema.idDeUltimoModificador',this._idDeUsuarioActual());
        this.set('esObligatorio',(this.get('nuevoTema.obligatoriedad')==='OBLIGATORIO'));
        this.set('mostrandoFormularioXTemaNuevo', false);
        this.set('mostrandoFormularioDeEdicion', true);})

      });
    },
    mostrarFormulario(){
      this._siNoEstaCerrada(function () {
          this._traerDuraciones().then((x)=>{
        this.set('mostrandoFormularioDeEdicion',false);
        this.set('mostrandoFormularioXTemaNuevo', true);
        this.set('nuevoTema', Tema.create({
            idDeReunion: this._idDeReunion(),
            idDeAutor: this._idDeUsuarioActual(),
            usuarioActual: this.get('model.usuarioActual'),
            idDeUltimoModificador:this._idDeUsuarioActual()
          })
        );
            })

      });
    },
    agregarTema(){
      this._guardarTemaYRecargar();
    },
    updatearTemaConfirmado(){
        this.set('nuevoTema.idsDeInteresados',[]);
        this._updatearTemaYRecargar();
    },
    updatearTema(){
      debugger;
      var tema = this.get('nuevoTema');
      tema.set('obligatoriedad',this._obligatoriedad(this.get('esObligatorio')));
      if(this.get('nuevoTema.obligatoriedad')==='OBLIGATORIO' && this.get('obligatoriedadPasada')==='NO_OBLIGATORIO'){
        this.set('modalDeCambioDeObligatoriedadAbierto',true);
      }
      else{
      this._updatearTemaYRecargar();
      };
    },
    pedirConfirmacionDeBorrado(temaABorrar){
      this.set('temaABorrar', temaABorrar);
      this.set('mensajeDeConfirmacionDeBorrado', `Estás seguro de borrar el tema "${temaABorrar.titulo}"? Los votos seran devueltos`);
      this.set('modalDeBorradoAbierto', true);
    },
    borrarTemaElegido(){
      var temaBorrable = this.get('temaABorrar');
      delete this.temaABorrar; // Desreferenciamos el objeto
      this._quitarTema(temaBorrable);
    },
    editarFecha(){
      this._siNoEstaCerrada(function () {
        this.set('editandoFecha', true);
      });
    },
    pedirConfirmacionDeCierre(){
      this.set('modalDeCierreAbierto', true);
    },
    cerrarVotacion(){
      this._cerrarReunion();
    },
    reabrirVotacion(){
      this._reabrirReunion();
    }
  },

  _traerDuraciones(){
    return this.duracionesService().getAll().then((duraciones) => {
      this.set('duraciones', duraciones);
    });
  },
  _guardarCambios(){
    var reunion = this.get('reunion');
    return this.reunionService().updateReunion(reunion)
      .then((reunionGuardada) => {
        this._actualizarreunionCon(reunionGuardada);
      });
  },

  _recargarReunion(){
    this.reunionService().getReunion(this._idDeReunion()).then((reunion) => {
      this._actualizarreunionCon(reunion);
    });
  },

  _updatearTemaYRecargar:function(){
    var tema = this.get('nuevoTema');
    this.temaService().updateTema(tema).then(() => {
        this.set('mostrandoFormularioDeEdicion', false);
        this._recargarReunion();
  });
    },
  _guardarTemaYRecargar: function () {
    var tema = this.get('nuevoTema');
    tema.obligatoriedad = this._obligatoriedad(this.get('esObligatorio'));
    this.temaService().createTema(tema).then(() => {
      this.set('mostrandoFormularioXTemaNuevo', false);
      this._recargarReunion();
    });
  },
  _borrarTemaYRecargar(tema){
    this.temaService().removeTema(tema).then(() => {
      this._recargarReunion();
    });
  },

  _idDeReunion() {
    return this.get('reunion.id');
  },

  _idDeUsuarioActual(){
    return this.get('usuarioActual.id');
  },

  _votarPorTema(tema){
    tema.agregarInteresado(this._idDeUsuarioActual());
    this.temaService().votarTema(tema.id).then(() => {
      this._recargarReunion();
    });
  },

  _quitarVotoDeTema(tema){
    tema.quitarInteresado(this._idDeUsuarioActual());
    this.temaService().quitarVotoTema(tema.id).then(() => {
      this._recargarReunion();
    });
  },

  _usarInstanciasDeTemas(reunion, usuarioActual){
    var temasPropuestos = reunion.get('temasPropuestos');
    for (var i = 0; i < temasPropuestos.length; i++) {
      var objetoEmber = temasPropuestos[i];
      objetoEmber.set('usuarioActual', usuarioActual);
      var tema = Tema.create(objetoEmber);
      temasPropuestos[i] = tema;
    }
  },

  _filtrarTemasGeneradosPorTemasGenerales(reunion){
    var temasFiltrados = reunion.get('temasPropuestos').filter(function (tema) {
      return !tema.get('esDeUnTemaGeneral');
    });
    reunion.set('temasPropuestos', temasFiltrados);
  },

  _cerrarReunion(){
    var reunion = this.get('reunion');
    this.reunionService().cerrarReunion(reunion)
      .then((cerrada) => {
        this._actualizarreunionCon(cerrada);
      });
  },

  _reabrirReunion(){
    var reunion = this.get('reunion');
    this.reunionService().reabrirReunion(reunion)
      .then((abierta) => {
        this._actualizarreunionCon(abierta);
      });
  },

  _actualizarreunionCon(reunion){
    this._usarInstanciasDeTemas(reunion, this.get('usuarioActual'));
    this._filtrarTemasGeneradosPorTemasGenerales(reunion);
    this.set('model.reunion', reunion);
  },

  _siNoEstaCerrada(accion){
    if (!this.get('estaCerrada')) {
      accion.call(this);
    }
  },

  _quitarTema(tema){
    this._siNoEstaCerrada(function () {
      this._borrarTemaYRecargar(tema);
    });
  },

  _obligatoriedad(esObligatorio){
    if (esObligatorio) {
      return "OBLIGATORIO";
    }
    else {
      return "NO_OBLIGATORIO";
    }
  },


});
