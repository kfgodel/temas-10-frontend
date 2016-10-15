import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import NavigatorInjected from "../../mixins/navigator-injected";
import ReunionServiceInjected from "../../mixins/reunion-service-injected";
import Tema from "../../concepts/tema";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, NavigatorInjected, {
  model() {
    return this.promiseWaitingFor(this.reunionService().getAllReuniones())
      .whenInterruptedAndReauthenticated(()=> {
        this.navigator().navigateToReuniones();
      })
      .then((reuniones)=> {
        reuniones.forEach((reunion)=> {
          this._usarInstanciasDeTemas(reunion, null);
        });
        return reuniones;
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
  }

});
