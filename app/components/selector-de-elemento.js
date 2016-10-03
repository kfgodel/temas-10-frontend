import Ember from "ember";
import ElementoServiceInjected from "../mixins/elemento-service-injected";
import MessagerInjected from "ateam-ember-messager/mixins/messager-injected";

export default Ember.Component.extend(ElementoServiceInjected, MessagerInjected, {
  init(){
    this._super(...arguments);
    this._actualizarElementosDisponibles();
    this.messager().subscribe({type: 'proyectosCambiados'}, ()=> {
      this._actualizarElementosDisponibles();
    });
  },
  willDestroy(){
    this.messager().unsubscribe({type: 'proyectosCambiados'});
    return this._super();
  },

  _actualizarElementosDisponibles: function () {
    this.elementoService().getAllElementos().then((elementos) => {
      this.set('elementosDisponibles', elementos);
    });
  },

});
