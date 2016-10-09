import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ReunionServiceInjected from "../mixins/reunion-service-injected";
import UserServiceInjected from "../mixins/user-service-injected";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, UserServiceInjected, {
  model() {
    return Ember.RSVP.hash({
      proximaRoots: this.reunionService().getProximaReunion(),
      usuarioActual: this.userService().getCurrentUser()
    });
  }
});
