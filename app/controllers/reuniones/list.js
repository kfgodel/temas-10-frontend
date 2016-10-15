import Ember from "ember";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import NavigatorInjected from "../../mixins/navigator-injected";

export default Ember.Controller.extend(ReunionServiceInjected, NavigatorInjected, {

  actions: {
    verReunion(reunion){
      Ember.Logger.info('Ver', reunion);
    },
    editarReunion(reunion){
      this.navigator().navigateToReunionesEdit(reunion.get('id'));
    },
    borrarReunion(reunion){
      Ember.Logger.info('Borrando', reunion);
    }
  }

});