import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import TemaServiceInjected from "../../mixins/tema-service-injected";
import Tema from "../../concepts/tema";

export default Ember.Controller.extend(ReunionServiceInjected, TemaServiceInjected, {

  reunion: Ember.computed('model.reunion', function () {
    return this.get('model.reunion');
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


  actions: {
    sumarVoto(tema){
      this._siNoEstaCerrada(function () {
        if (this.get('votosRestantes')) {
          this._votarPorTema(tema);
        }
      });
    },
    restarVoto(tema){
      this._siNoEstaCerrada(function () {
        this._quitarVotoDeTema(tema);
      });
    },
    mostrarFormulario(){
      this._siNoEstaCerrada(function () {
        this.set('mostrandoFormulario', true);
        this.set('nuevoTema', Tema.create({
            idDeReunion: this._idDeReunion(),
            idDeAutor: this._idDeUsuarioActual(),
            usuarioActual: this.get('model.usuarioActual')
          })
        );
      });
    },
    agregarTema(){
      this._guardarTemaYRecargar();
    },
    quitarTema(tema){
      this._siNoEstaCerrada(function () {
        this._borrarTemaYRecargar(tema);
      });
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

  _guardarCambios(){
    var reunion = this.get('reunion');
    return this.reunionService().updateReunion(reunion)
      .then((reunionGuardada)=> {
        this._actualizarreunionCon(reunionGuardada);
      });
  },

  _recargarReunion(){
    this.reunionService().getReunion(this._idDeReunion()).then((reunion)=> {
      this._actualizarreunionCon(reunion);
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
    return this.get('reunion.id');
  },

  _idDeUsuarioActual(){
    return this.get('usuarioActual.id');
  },

  _votarPorTema(tema){
    tema.agregarInteresado(this._idDeUsuarioActual());
    this.temaService().updateTema(tema).then(()=> {
      this._recargarReunion();
    });
  },

  _quitarVotoDeTema(tema){
    tema.quitarInteresado(this._idDeUsuarioActual());
    this.temaService().updateTema(tema).then(()=> {
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

  _cerrarReunion(){
    var reunion = this.get('reunion');
    this.reunionService().cerrarReunion(reunion)
      .then((cerrada)=> {
        this._actualizarreunionCon(cerrada);
      });
  },

  _reabrirReunion(){
    var reunion = this.get('reunion');
    this.reunionService().reabrirReunion(reunion)
      .then((abierta)=> {
        this._actualizarreunionCon(abierta);
      });
  },

  _actualizarreunionCon(reunion){
    this._usarInstanciasDeTemas(reunion, this.get('usuarioActual'));
    this.set('model.reunion', reunion);
  },

  _siNoEstaCerrada(accion){
    if (!this.get('estaCerrada')) {
      accion.call(this);
    }
  }

});