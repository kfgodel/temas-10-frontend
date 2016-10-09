import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ReunionServiceInjected from "../mixins/reunion-service-injected";
import UserServiceInjected from "../mixins/user-service-injected";
import Tema from "../concepts/tema";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, UserServiceInjected, {
  model() {
    return Ember.RSVP.hash({
      proximaRoots: this.reunionService().getProximaReunion(),
      usuarioActual: this.userService().getCurrentUser()
    }).then((model)=> {
      this._usarInstanciasDeTemas(model.proximaRoots, model.usuarioActual);
      return model;
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
