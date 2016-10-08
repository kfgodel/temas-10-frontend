import Ember from "ember";
import AuthenticatedRoute from "ateam-ember-authenticator/mixins/authenticated-route";
import ReunionServiceInjected from "../mixins/reunion-service-injected";

export default Ember.Route.extend(AuthenticatedRoute, ReunionServiceInjected, {
  model: function () {
    return this.reunionService().getProximaReunion();
  }
});
