import Ember from "ember";
import EstadoServiceInjected from "../mixins/estado-service-injected";

export default Ember.Component.extend(EstadoServiceInjected, {
  init(){
    this._super(...arguments);
    this.estadoService().getAllEstados().then((estados) => {
      this.set('estadosDisponibles', estados);
    });
  }
});
