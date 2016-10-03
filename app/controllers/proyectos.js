import Ember from "ember";
import ProyectoServiceInjected from "../mixins/proyecto-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";

export default Ember.Controller.extend(ProyectoServiceInjected, MessagerInjected, {

  init(){
    this._super(...arguments);
    this._limpiarFormulario();
    this._cargarProyectos();
  },

  _limpiarFormulario(){
    this.set('proyecto', Ember.Object.create({
      nombreDescriptivo: null,
      elemento: null,
      estado: null,
      id: null
    }));
  },

  actions: {
    crearProyecto(){
      var nuevoProyecto = this.get('proyecto');
      this.proyectoService().createProyecto(nuevoProyecto).then(() => {
        this._limpiarFormulario();
        this._cargarProyectos();
        this._notificarCambiosAProyectos();
      });
    },
    borrarProyecto(proyecto){
      this.proyectoService().removeProyecto(proyecto).then(()=> {
        this._cargarProyectos();
        this._notificarCambiosAProyectos();
      });
    }
  },

  _cargarProyectos(){
    this.proyectoService().getAllProyectos().then(proyectos => {
      this.set('proyectos', proyectos);
    });
  },

  _notificarCambiosAProyectos(){
    this.messager().publish({type: 'proyectosCambiados'});
  }

});