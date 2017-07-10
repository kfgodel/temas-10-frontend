import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import NavigatorInjected from "../../mixins/navigator-injected";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import UserServiceInjected from "../../mixins/user-service-injected";
import Tema from "../../concepts/tema";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, UserServiceInjected, NavigatorInjected, {
  model: function (params) {
    var reunionId = params.reunion_id;

    return Ember.RSVP.hash({
      reunion: this.promiseWaitingFor(this.reunionService().getReunion(reunionId))
        .whenInterruptedAndReauthenticated(()=> {
          this.navigator().navigateToReunionesEdit(reunionId);
        }),
      usuarioActual: this.promiseWaitingFor(this.userService().getCurrentUser())
        .whenInterruptedAndReauthenticated(()=> {
          this.navigator().navigateToReunionesEdit(reunionId);
        })
    }).then((model)=> {
      this._usarInstanciasDeTemas(model.reunion, model.usuarioActual);

      return model;
    });
  },

  _usarInstanciasDeTemas(reunion, usuarioActual){
    var temasDeLaReunion = reunion.get('temasPropuestos');
    for (var i = 0; i < temasDeLaReunion.length; i++) {
      var temaDeLaReunion = temasDeLaReunion[i];
      temaDeLaReunion.set('usuarioActual', usuarioActual);
      var temaConComportamiento = Tema.create(temaDeLaReunion);
      temasDeLaReunion[i] = temaConComportamiento;
    }
  },

});
