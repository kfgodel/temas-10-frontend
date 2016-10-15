import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ReunionServiceInjected, NavigatorInjected, {

  anchoDeTabla: 's12',

  actions: {
    verReunion(reunion){
      this._mostrarDetalleDe(reunion);
    },
    editarReunion(reunion){
      this.navigator().navigateToReunionesEdit(reunion.get('id'));
    },
    borrarReunion(reunion){
      this.reunionService().removeReunion(reunion)
        .then(()=> {
          this.set('mostrandoDetalle', false);
          this.set('anchoDeTabla', 's12');
          // Actualizamos la lista
          this.get('target.router').refresh();
        });
    }
  },

  _mostrarDetalleDe(reunion){
    this.set('reunionSeleccionada', reunion);
    this.set('anchoDeTabla', 's4');
    this.set('mostrandoDetalle', true);
  }


});